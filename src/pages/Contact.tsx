import { ChangeEvent, FormEvent, useState } from 'react';

import { LAYOUT_VALUES } from '../resources/constants';
import { useLayout } from '../hooks/useLayout';



export function Contact() {

    const { layout } = useLayout();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const getLayoutSpecificContent = () => {
        const layoutContent = {
            [LAYOUT_VALUES.PRIMARY]: {
                // image: 'ddolive.svg',
                imagePath: '/src/assets/dog-door/ddolive.svg',
                buttonClass: 'bg-[#C2A87A] text-white'
            },
            [LAYOUT_VALUES.SECONDARY]: {
                imagePath: '/src/assets/dog-door/ddsnow.svg',
                buttonClass: 'bg-[#6096BA] text-white'
            },
            [LAYOUT_VALUES.TERTIARY]: {
                imagePath: '/src/assets/dog-door/ddpurple.svg',
                buttonClass: 'bg-[#7E78D2] text-white'
            }
        };

        return layoutContent[layout] || layoutContent[LAYOUT_VALUES.PRIMARY];
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const subject = `New Contact Form Submission from ${formData.name}`;
        const body = `
        Name: ${formData.name}
        Email: ${formData.email}
        
        Message:
        ${formData.message}
        `;

        const mailtoLink = `mailto:hello@labackdoor.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;

        // clear the form after submission
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const { imagePath, buttonClass } = getLayoutSpecificContent();

    return (
        <div className="h-full px-4 py-12 mx-auto max-w-7xl font-akzidenz">
            <h1 className="mb-12 text-4xl font-bold text-center">Let Us Know</h1>

            <div className="grid items-center gap-8 md:grid-cols-2">
                {/* Left Column - Image */}
                <div className="flex items-center justify-center">
                    <div className="w-[95%] max-w-md">
                        <img
                            src={imagePath}
                            alt="La Backdoor Contact"
                            className="w-full rounded-lg"
                        />
                    </div>
                </div>

                {/* Right Column - Contact Form */}
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
                                className="w-full px-4 py-2 bg-transparent border border-current rounded-md text-slate-500 focus:outline-none focus:ring-2 focus:ring-current"
                                required
                            />
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
                                className="w-full px-4 py-2 bg-transparent border border-current rounded-md text-slate-500 focus:outline-none focus:ring-2 focus:ring-current"
                                required
                            />
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
                                rows={4}
                                className="w-full px-4 py-2 bg-transparent border border-current rounded-md text-slate-500 focus:outline-none focus:ring-2 focus:ring-current"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={`flex items-center justify-center w-full gap-2 px-6 py-3 text-inherit transition-colors duration-200 rounded-md hover:bg-${buttonClass} ${buttonClass}`}
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}