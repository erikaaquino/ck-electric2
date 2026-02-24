import React from 'react';
import { Bolt, Verified, Timer, Phone, Mail, LocationOn, Check, ArrowRightAlt, FormatQuote, CorporateFare, ElectricBolt, GridView, Light, ChargingStation, Construction, Call } from '@mui/icons-material';
import Button from './Button';

export default function HomePage() {
  return (
    <main className="bg-primary-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-32">
        <div className="absolute inset-0 z-0 bg-primary-100 clip-diagonal">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-100 via-primary-100/60 to-transparent z-10"></div>
          <img 
            alt="Professional electrician working" 
            className="w-full h-full object-cover opacity-40 mix-blend-multiply" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe1RGeqlhyzdm30jYOPD9HCL5yeYkmqTmDP8YHhPde388fuAjj5yUNgcTMi5wM5p-7m2FjEg7REBZKjBYIIvHLiGnl5CoamJanmWrHX-oxIky2gOJ3r8iHWB16MULUGKtMv9knWBq-2s317u7chblbTbQLI2B9Aul3ej42k6uQ8nyfpU7rDA-cqo8o3aeOLx-NqgKY9Nhv2LV0X2lnvNaSfC3CSGeMqLSAmLiZcsyCLXHoXptBMGQpy_UGpCZh1llDd_AnSjUmc6Q"
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-950 text-primary-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              <span className="flex h-2 w-2 rounded-full bg-positive-500 animate-pulse"></span>
              Direct Access to Licensed Experts
            </div>
            
            <h1 className="text-display-1 text-neutral-950 leading-[0.9] mb-8 tracking-tighter">
              Efficiency and <br/>
              <span className="text-primary-500 italic underline decoration-primary-400">Quality.</span>
            </h1>
            
            <p className="text-large text-neutral-700 mb-10 font-medium leading-relaxed max-w-xl">
              Talk directly with a licensed electrician. No call centers, no middlemen. Fast response and industrial-grade quality for every project.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-4 border-l-4 border-primary-500">
                <Verified className="text-primary-500 text-4xl" />
                <div>
                  <p className="text-neutral-950 font-black uppercase text-xs tracking-widest">Licensed & Bonded</p>
                  <p className="text-neutral-700/70 text-xs mt-1">Full Compliance Guaranteed</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-4 border-l-4 border-primary-500">
                <Timer className="text-primary-500 text-4xl" />
                <div>
                  <p className="text-neutral-950 font-black uppercase text-xs tracking-widest">Fast Response</p>
                  <p className="text-neutral-700/70 text-xs mt-1">Same-day Estimates Available</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-primary-500 rotate-3 z-0"></div>
            <div className="relative z-10 bg-white p-10 shadow-2xl">
              <h3 className="text-display-3 text-neutral-950 mb-2">Get a Free Estimate</h3>
              <p className="text-neutral-700/60 text-sm mb-8 font-medium">Professional service within 24 hours.</p>
              
              <form className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-neutral-950 uppercase tracking-widest">Name</label>
                    <input 
                      className="w-full bg-primary-50 border-transparent focus:border-primary-500 focus:ring-0 text-neutral-950 text-sm p-4" 
                      placeholder="Your Name" 
                      type="text"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-neutral-950 uppercase tracking-widest">Phone</label>
                    <input 
                      className="w-full bg-primary-50 border-transparent focus:border-primary-500 focus:ring-0 text-neutral-950 text-sm p-4" 
                      placeholder="(555) 000-0000" 
                      type="tel"
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-neutral-950 uppercase tracking-widest">Project Type</label>
                  <select className="w-full bg-primary-50 border-transparent focus:border-primary-500 focus:ring-0 text-neutral-950 text-sm p-4">
                    <option>Residential Wiring</option>
                    <option>Commercial Service</option>
                    <option>EV Charger Installation</option>
                    <option>Panel Replacement</option>
                    <option>Lighting Design</option>
                  </select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-neutral-950 uppercase tracking-widest">Message</label>
                  <textarea 
                    className="w-full bg-primary-50 border-transparent focus:border-primary-500 focus:ring-0 text-neutral-950 text-sm p-4" 
                    placeholder="How can we help?" 
                    rows={3}
                  ></textarea>
                </div>
                
                <Button
                  label="Request Immediate Estimate"
                  type="submit"
                  className="w-full bg-negative-500 hover:bg-neutral-950 text-white font-black py-5 uppercase tracking-widest text-xs"
                />
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="relative z-30 -mt-16 skew-panel bg-neutral-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 skew-content">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-primary-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Experience</p>
              <p className="text-display-4 text-white italic">25+ Yrs</p>
            </div>
            <div>
              <p className="text-primary-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Response</p>
              <p className="text-display-4 text-white italic">&lt;24 Hrs</p>
            </div>
            <div>
              <p className="text-primary-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Satisfied</p>
              <p className="text-display-4 text-white italic">1.2k+</p>
            </div>
            <div>
              <p className="text-primary-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Licensed</p>
              <p className="text-display-4 text-white italic">Direct</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-32 bg-primary-50" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-20 items-center">
            <div className="w-full md:w-1/2 relative group">
              <div className="absolute top-0 left-0 w-full h-full bg-primary-400 -rotate-3 transition-transform group-hover:rotate-0"></div>
              <img 
                alt="Modern industrial electrical equipment" 
                className="relative z-10 w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuANLZ7KGX7PAID37XG0QghBlVd6mx5151hYLtPb__9r9muTE_OVodG09JpjxXC20XbMKiqFvHriC13oTOg-6M-cS8J6wz2Eal1zizA_zFVtzW55ZUOR6THsd7rmYfcIc5nYPnwthvKNH4FP6Ffw6Vyg4tYQsxRcIE8T95B9-KDPdk7YXMDVwYth_u5NKtQpB9-aoG4Fow4jdgYcM5ArO-ogkYwdFWZ04bwSVT4SbBq24kFi8SQo6hN3cF0HEFbcVRVujlc-H9RCPwY"
              />
            </div>
            
            <div className="w-full md:w-1/2">
              <h2 className="text-primary-500 font-black text-xs tracking-[0.4em] uppercase mb-4">No Middlemen. No Mess.</h2>
              <h3 className="text-display-2 text-neutral-950 mb-8 leading-tight">
                Locally Owned & <br/>Expertly Operated
              </h3>
              
              <div className="space-y-6 text-neutral-700 text-large font-medium leading-relaxed">
                <p>CK Electric was founded on a simple principle: people deserve to talk to the experts doing the work. When you call us, you speak directly with Rob or Matt, not a call center.</p>
                <p>We combine industrial-grade precision with residential-level care. Whether it's a major commercial TI or a home panel upgrade, we bring decades of experience.</p>
                
                <ul className="grid grid-cols-1 gap-4 pt-6">
                  <li className="flex items-center gap-4 text-neutral-950 font-black uppercase text-xs tracking-widest">
                    <span className="w-6 h-6 bg-positive-500 flex items-center justify-center text-white rotate-45">
                      <Check className="text-sm -rotate-45" />
                    </span>
                    Licensed Master Electricians
                  </li>
                  <li className="flex items-center gap-4 text-neutral-950 font-black uppercase text-xs tracking-widest">
                    <span className="w-6 h-6 bg-positive-500 flex items-center justify-center text-white rotate-45">
                      <Check className="text-sm -rotate-45" />
                    </span>
                    Zero Outsourcing
                  </li>
                  <li className="flex items-center gap-4 text-neutral-950 font-black uppercase text-xs tracking-widest">
                    <span className="w-6 h-6 bg-positive-500 flex items-center justify-center text-white rotate-45">
                      <Check className="text-sm -rotate-45" />
                    </span>
                    Puget Sound Focused
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-primary-100 clip-diagonal-reverse" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="text-center mb-24">
            <h2 className="text-primary-500 font-black text-xs tracking-[0.4em] uppercase mb-4">What We Do</h2>
            <h3 className="text-display-2 text-neutral-950">Full-Spectrum Services</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative bg-white p-10 hover:-translate-y-2 transition-all duration-300 border-b-8 border-primary-500">
              <div className="w-16 h-16 bg-neutral-950 text-primary-500 flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0 transition-transform">
                <CorporateFare className="text-4xl" />
              </div>
              <h4 className="text-display-4 text-neutral-950 mb-4">Commercial TIs</h4>
              <p className="text-neutral-700 text-sm leading-relaxed mb-8 font-medium">Expert build-outs and improvements for retail, office, and industrial spaces across the corridor.</p>
              <a className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-neutral-950 group-hover:text-primary-500 transition-colors" href="#">
                Learn More <ArrowRightAlt className="text-sm" />
              </a>
            </div>
            
            <div className="group relative bg-white p-10 hover:-translate-y-2 transition-all duration-300 border-b-8 border-primary-400">
              <div className="w-16 h-16 bg-neutral-950 text-primary-500 flex items-center justify-center mb-8 -rotate-3 group-hover:rotate-0 transition-transform">
                <ElectricBolt className="text-4xl" />
              </div>
              <h4 className="text-display-4 text-neutral-950 mb-4">Wiring & Rewiring</h4>
              <p className="text-neutral-700 text-sm leading-relaxed mb-8 font-medium">Modernizing outdated electrical systems for safety, efficiency, and code compliance.</p>
              <a className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-neutral-950 group-hover:text-primary-500 transition-colors" href="#">
                Learn More <ArrowRightAlt className="text-sm" />
              </a>
            </div>
            
            <div className="group relative bg-white p-10 hover:-translate-y-2 transition-all duration-300 border-b-8 border-primary-500">
              <div className="w-16 h-16 bg-neutral-950 text-primary-500 flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0 transition-transform">
                <GridView className="text-4xl" />
              </div>
              <h4 className="text-display-4 text-neutral-950 mb-4">Panel Upgrades</h4>
              <p className="text-neutral-700 text-sm leading-relaxed mb-8 font-medium">Support high-demand appliances and ensure modern safety standards with panel replacements.</p>
              <a className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-neutral-950 group-hover:text-primary-500 transition-colors" href="#">
                Learn More <ArrowRightAlt className="text-sm" />
              </a>
            </div>
            
            <div className="group relative bg-white p-10 hover:-translate-y-2 transition-all duration-300 border-b-8 border-primary-400">
              <div className="w-16 h-16 bg-neutral-950 text-primary-500 flex items-center justify-center mb-8 -rotate-3 group-hover:rotate-0 transition-transform">
                <Light className="text-4xl" />
              </div>
              <h4 className="text-display-4 text-neutral-950 mb-4">Lighting Solutions</h4>
              <p className="text-neutral-700 text-sm leading-relaxed mb-8 font-medium">Custom LED design, landscape lighting, and smart home lighting controls for security.</p>
              <a className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-neutral-950 group-hover:text-primary-500 transition-colors" href="#">
                Learn More <ArrowRightAlt className="text-sm" />
              </a>
            </div>
            
            <div className="group relative bg-white p-10 hover:-translate-y-2 transition-all duration-300 border-b-8 border-primary-500">
              <div className="w-16 h-16 bg-neutral-950 text-primary-500 flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0 transition-transform">
                <ChargingStation className="text-4xl" />
              </div>
              <h4 className="text-display-4 text-neutral-950 mb-4">EV Chargers</h4>
              <p className="text-neutral-700 text-sm leading-relaxed mb-8 font-medium">Fast, certified installation of Tesla, JuiceBox, and ChargePoint residential chargers.</p>
              <a className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-neutral-950 group-hover:text-primary-500 transition-colors" href="#">
                Learn More <ArrowRightAlt className="text-sm" />
              </a>
            </div>
            
            <div className="group relative bg-white p-10 hover:-translate-y-2 transition-all duration-300 border-b-8 border-primary-400">
              <div className="w-16 h-16 bg-neutral-950 text-primary-500 flex items-center justify-center mb-8 -rotate-3 group-hover:rotate-0 transition-transform">
                <Construction className="text-4xl" />
              </div>
              <h4 className="text-display-4 text-neutral-950 mb-4">Emergency Repair</h4>
              <p className="text-neutral-700 text-sm leading-relaxed mb-8 font-medium">Rapid response for electrical failures and proactive preventative maintenance.</p>
              <a className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-neutral-950 group-hover:text-primary-500 transition-colors" href="#">
                Learn More <ArrowRightAlt className="text-sm" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-negative-500 p-12 md:p-20 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 -mr-32 -mt-32 rotate-45 transition-transform group-hover:rotate-90 duration-1000"></div>
            <h3 className="text-display-2 text-white mb-8 relative z-10">Ready to start your electrical project?</h3>
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <Button
                label="Get a Free Estimate"
                href="#estimate"
                variant="secondary"
                className="bg-white text-negative-500 font-black px-10 py-5 uppercase tracking-widest text-xs"
              />
              <Button
                label="Call Us Now"
                href="tel:5550123456"
                className="bg-neutral-950 text-white font-black px-10 py-5 uppercase tracking-widest text-xs"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
