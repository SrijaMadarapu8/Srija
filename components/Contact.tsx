import React, { useState } from 'react';
import { Mail, Linkedin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;
    
    // Construct mailto link
    const subject = `Portfolio Contact from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoLink = `mailto:madarapu@usc.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoLink;
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden bg-white dark:bg-black transition-colors duration-300">
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-200 via-gray-50 to-white dark:from-gray-800 dark:via-black dark:to-black opacity-50"></div>
       
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Let's Collaborate</h2>
          <p className="text-gray-600 dark:text-gray-400">Available for freelance and full-time opportunities in XR and Graphics.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div className="bg-white dark:bg-gray-900/50 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg dark:shadow-none">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 rounded p-3 text-gray-900 dark:text-white focus:border-cyan-500 dark:focus:border-neon-cyan focus:outline-none transition-colors" 
                  placeholder="John Doe" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 rounded p-3 text-gray-900 dark:text-white focus:border-cyan-500 dark:focus:border-neon-cyan focus:outline-none transition-colors" 
                  placeholder="john@example.com" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Message</label>
                <textarea 
                  rows={4} 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 rounded p-3 text-gray-900 dark:text-white focus:border-cyan-500 dark:focus:border-neon-cyan focus:outline-none transition-colors" 
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 dark:bg-neon-cyan dark:hover:bg-cyan-400 text-white dark:text-black font-bold py-3 rounded transition-colors flex justify-center items-center gap-2">
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>

          <div className="flex flex-col justify-center space-y-8">
             <div className="flex items-start gap-4">
               <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-purple-600 dark:text-neon-purple">
                 <Mail size={24} />
               </div>
               <div>
                 <h4 className="text-lg font-bold text-gray-900 dark:text-white">Email</h4>
                 <div className="flex flex-col gap-1">
                   <a href="mailto:madarapu@usc.edu" className="text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-white transition-colors">
                     madarapu@usc.edu
                   </a>
                 </div>
                 <div >
                   <a href="mailto:srijam358@gmail.com" className="text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-white transition-colors">
                     srijam358@gmail.com
                   </a>
                 </div>
               </div>
             </div>

             <div className="flex items-start gap-4">
               <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-blue-600 dark:text-blue-500">
                 <Linkedin size={24} />
               </div>
               <div>
                 <h4 className="text-lg font-bold text-gray-900 dark:text-white">LinkedIn</h4>
                 <a href="https://linkedin.com/in/srija-madarapu" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-white transition-colors">
                   linkedin.com/in/srija-madarapu
                 </a>
               </div>
             </div>

             <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-800">
                <p className="text-gray-600 dark:text-gray-300 text-sm italic">
                  "The best way to predict the future is to invent it."
                </p>
                <div className="mt-4 flex gap-4">
                  <a 
                    href="/Srija_Madarapu_resume.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-gray-500 hover:text-black dark:hover:text-white uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    View Resume
                  </a>
                </div>
             </div>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-gray-200 dark:border-gray-900 text-center text-gray-500 dark:text-gray-600 text-sm">
          &copy;  Srija Madarapu. Built with React & WebGL.
        </div>
      </div>
    </section>
  );
};

export default Contact;