import React from 'react';

import './project.css';
import mrn1Image from '../../assets/project/mrn/mrn1.jpg';
import mrn2Image from '../../assets/project/mrn/mrn2-1.png';
import mrn3Image from '../../assets/project/mrn/mrn3.jpeg';
import mrn4Image from '../../assets/project/mrn/mrn4.png';


// ERGO, we need to make this the standard for blogs on the project. roll back branch development to see previous version of the blog on MRNs
//idk if that makes sense. just lmk
const MRNsPage: React.FC = () => {
    return (
        <div className="mrns-page">
            <h1 className='font-black text-2xl'>A Brief History &amp; Introduction to Multi-Recurrent Neural Networks (MRNs)</h1>

            {/* Image Suggestion #1 */}
            <div className="image-container">
                <img
                    src={mrn1Image}
                    alt="Conceptual diagram illustrating different types of neural networks (Feedforward, Simple Recurrent, Multi-Recurrent)"
                />
            </div>

            <section>
                <p>
                    Neural Networks have long been used for tasks such as handwriting recognition, weather forecasting,
                    and financial market analysis. Over time, researchers saw the limitations of basic feedforward networks
                    for sequence or time-based data—these networks lacked "memory" of previously seen inputs. That’s where
                    Recurrent Neural Networks (RNNs) came in.
                </p>
                <p>
                    While RNNs introduced a form of memory using feedback connections, they were still prone to issues like
                    vanishing gradients and catastrophic interference. More advanced architectures like LSTM (Long Short-Term Memory)
                    and GRU (Gated Recurrent Unit) tried to fix these problems via gating mechanisms, though they often add
                    complexity and require substantial computational resources.
                </p>
            </section>

            <h2 className='font-semibold text-xl'>How Do MRNs Work?</h2>
            {/* Image Suggestion #2 */}
            <div className="image-container">
                <img
                    src={mrn2Image}
                    alt="A simplified diagram showing the multiple memory banks (input, hidden, output) of an MRN with different feedback loops"
                />
            </div>

            <section>
                <p>
                    MRNs improve on simple recurrent networks (like Elman or Jordan nets) by having multiple memory banks.
                    Each bank can store a different ratio of older vs. newer information:
                </p>
                <ul>
                    <li><strong>Input Memory</strong> – Stores recent inputs for short-term references.</li>
                    <li><strong>Hidden Memory</strong> – Maintains hidden-layer states but at varied strengths.</li>
                    <li><strong>Output Memory</strong> – Keeps track of past outputs so the network can refine future forecasts.</li>
                </ul>
            </section>

            <h3>Why Use MRNs for Time-Series?</h3>
            <section>
                <p>Time-series problems benefit from capturing patterns over different time spans. MRNs excel here because:</p>
                <ul>
                    <li><strong>Flexible memory:</strong> Some memory banks adapt quickly to new data, while others retain older info longer.</li>
                    <li><strong>Reduced complexity:</strong> Unlike LSTM, MRNs remain relatively compact while capturing long dependencies.</li>
                </ul>
            </section>

            <h3>Real-World Uses of MRNs</h3>
            <section>
                <p><strong>1. Sluggish States for Economic Turning Points</strong></p>
                <p>
                    MRNs can capture cyclical trends and short-term shock data better than standard statistical models.
                    Experiments show they rank high in accuracy metrics for predicting economic turning points.
                </p>

                <p><strong>2. Crude Oil Price Predictions</strong></p>
                <div className="image-container">
                    <img
                        src={mrn3Image}
                        alt="A line graph comparing actual vs. predicted crude oil prices by an MRN over time"
                    />
                </div>
                <p>
                    MRNs have been found to outperform simpler RNNs for medium- and long-range predictions in volatile domains
                    like crude oil pricing.
                </p>

                <p><strong>3. Forecasting COVID-19 Spread</strong></p>
                <p>
                    During the pandemic, MRNs helped capture both near-term surges and long-term trends more effectively than
                    standard RNNs.
                </p>

                <p><strong>4. M3 Competition Benchmarks</strong></p>
                <p>
                    In time-series forecasting competitions, MRNs have shown strong performance across various datasets.
                </p>
            </section>

            <h3>Key Challenges &amp; Future Directions</h3>
            <section>
                <p>Despite its advantages, MRNs face a few challenges:</p>
                <ol>
                    <li><strong>Hyper-parameter Tuning:</strong> Finding optimal memory-bank counts and ratios can be time-consuming.</li>
                    <li><strong>Large Search Space:</strong> Training all configurations can be computationally heavy.</li>
                    <li><strong>Vanishing Gradients:</strong> While mitigated, deeper tasks may still push MRNs to their limits.</li>
                </ol>
            </section>

            <h4>Additional Research Ideas</h4>
            <ul>
                <li><strong>Adaptive Activation Functions:</strong> Use modern activations like ReLU to improve memory capacity.</li>
                <li><strong>Explainable AI:</strong> Tools to interpret how an MRN decides on a forecast can improve trust in critical applications.</li>
                <li><strong>Combining with CNNs:</strong> For image/time hybrid tasks, embedding an MRN into a CNN pipeline can improve performance.</li>
            </ul>

            <h2 className='font-bold text-lg'>How We at Labackdoor Are Using MRNs</h2>
            <section>
                <p>
                    At Labackdoor, we explore how MRNs can analyze digital threats by studying software vulnerabilities over time.
                    By capturing both short- and long-term dependencies, we can track evolving threat patterns more effectively.
                </p>
                <p>
                    Our MRN prototypes incorporate emerging vulnerability disclosures and new exploit tactics, helping us adapt to
                    the evolving threat landscape. Initial results show promise in detecting nuanced patterns missed by simpler algorithms.
                </p>
            </section>

            <h2 className='font-semibold text-lg'>Conclusion</h2>
            <div className="image-container">
                <img
                    src={mrn4Image}
                    alt="A conceptual takeaway graphic summarizing MRNs' position among other RNN approaches"
                />
            </div>
            <section>
                <p>Multi-Recurrent Neural Networks provide a balance of simplicity and memory depth. They are effective in:</p>
                <ul>
                    <li>Maintaining a simpler architecture than LSTMs or GRUs.</li>
                    <li>Offering a powerful, flexible memory mechanism.</li>
                    <li>Adapting well to a wide range of time-series and sequential tasks.</li>
                </ul>
                <p>
                    MRNs are a solid candidate for forecasting needs where capturing both recent surges and older trends is crucial.
                    Their enhancements, such as self-learning ratios and periodic attentiveness, further boost their capabilities.
                </p>
            </section>
        </div>
    );
};

export default MRNsPage;