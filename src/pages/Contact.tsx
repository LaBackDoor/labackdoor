import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { LAYOUT_VALUES } from '../resources/constants';
import ddpurple from '../assets/dog-door/ddpurple.svg';
import ddolive from '../assets/dog-door/ddolive.svg';
import ddsnow from '../assets/dog-door/ddsnow.svg';
import { useLayout } from '../hooks/useLayout';



interface FormData {
    name: string;
    email: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

export function Contact() {
    const { layout } = useLayout();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: ''
    });

    const [token, setToken] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    useEffect(() => {
        // fetch token at mount
        const fetchToken = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/contact/token');
                const data = await response.json();
                if (data.success) {
                    setToken(data.token);
                }
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };
        fetchToken();
    }, []);

    const getLayoutSpecificContent = () => {
        const layoutContent = {
            [LAYOUT_VALUES.PRIMARY]: {
                image: ddolive,
                buttonClass: 'bg-[#C2A87A] text-white'
            },
            [LAYOUT_VALUES.SECONDARY]: {
                image: ddsnow,
                buttonClass: 'bg-[#6096BA] text-white'
            },
            [LAYOUT_VALUES.TERTIARY]: {
                image: ddpurple,
                buttonClass: 'bg-[#7E78D2] text-white'
            }
        };

        return layoutContent[layout] || layoutContent[LAYOUT_VALUES.PRIMARY];
    };

    const validateField = (name: string, value: string): string => {
        switch (name) {
            case 'name':
                if (!value.trim()) return 'Name is required';
                if (value.length < 2) return 'Name must be at least 2 characters';
                if (value.length > 50) return 'Name must be less than 50 characters';
                if (!/^[a-zA-Z\s-']+$/.test(value)) return 'Name can only contain letters, spaces, hyphens, and apostrophes';
                return '';

            case 'email':
                if (!value.trim()) return 'Email is required';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
                return '';

            case 'message':
                if (!value.trim()) return 'Message is required';
                if (value.length < 10) return 'Message must be at least 10 characters';
                if (value.length > 1000) return 'Message must be less than 1000 characters';
                return '';

            default:
                return '';
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (touched[name]) {
            const error = validateField(name, value);
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    };

    const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));
        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;

        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key as keyof FormData]);
            if (error) {
                newErrors[key as keyof FormErrors] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);

        try {
            const response = await fetch("http://localhost:3000/api/contact", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    'X-Contact-Token': token
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                setFormData({ name: '', email: '', message: '' });
                toast.success('Thank you, your message has been sent!')
            } else {
                toast.error(data.message || "Failed to send message. Please try again :)")
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false)
        }
    };

    const { image, buttonClass } = getLayoutSpecificContent();

    const getInputClassName = (fieldName: keyof FormData) => {
        const baseClasses = "w-full px-4 py-2 bg-transparent border rounded-md focus:outline-none focus:ring-2";
        const errorClasses = errors[fieldName as keyof FormErrors] && touched[fieldName]
            ? "border-red-500 focus:ring-red-500"
            : "border-current text-slate-500 focus:ring-current";
        return `${baseClasses} ${errorClasses}`;
    };

    return (
        <div className="h-full px-4 py-12 mx-auto max-w-7xl font-akzidenz">
            <ToastContainer position="top-right" autoClose={4200} />
            <h1 className="mb-12 text-4xl font-bold text-center">Let Us Know</h1>

            <div className="grid items-center gap-8 md:grid-cols-2">
                <div className="flex items-center justify-center">
                    <div className="w-[95%] max-w-md">
                        <img
                            src={image}
                            alt="La Backdoor Contact"
                            className="w-full rounded-lg"
                        />
                    </div>
                </div>

                <div className="w-full max-w-md mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium"
                            >
                                name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={getInputClassName('name')}
                                required
                            />
                            {errors.name && touched.name && (
                                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium"
                            >
                                email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={getInputClassName('email')}
                                required
                            />
                            {errors.email && touched.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                className="block mb-2 text-sm font-medium"
                            >
                                message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                rows={4}
                                className={getInputClassName('message')}
                                required
                            />
                            {errors.message && touched.message && (
                                <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className={`flex items-center justify-center w-full gap-2 px-6 py-3 text-inherit transition-colors duration-200 rounded-md hover:bg-${buttonClass} ${buttonClass}`}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}