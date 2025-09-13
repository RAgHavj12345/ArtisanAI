"use client"; // This directive is essential for Next.js

import React, { useState } from 'react';
// The 'next/image' import was causing a compilation error, so we will use the standard <img> tag.
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// --- MOCK DATA (Using your local images) ---
const mockProducts = [
  { id: 1, name: 'Hand-Painted Ceramic Vase', artisan: 'Artisan Popck', price: 1490, imageUrl: '/images/Hand-Painted Ceramic Vase.png' }, 
  { id: 2, name: 'Intricate Wooden Box', artisan: 'Artisan Crape', price: 2690, imageUrl: '/images/Intricate Wooden Box.png' },
  { id: 3, name: 'Glazed Pottery Set', artisan: 'Artisan Brape', price: 1490, imageUrl: '/images/Glazed Pottery Set.png' },
  { id: 4, name: 'Woven Bamboo Baskets', artisan: 'Artisan Baell', price: 7590, imageUrl: '/images/Woven Bamboo Baskets.png' },
  { id: 5, name: 'Decorative Clay Plate', artisan: 'Artisan Sopch', price: 7990, imageUrl: '/images/Decorative Clay Plate.png' },
  { id: 6, name: 'Carved Wooden Mugs', artisan: 'Artisan Prape', price: 1590, imageUrl: '/images/Carved Wooden Mugs.png' },
  { id: 7, name: 'Painted Terracotta Pot', artisan: 'Artisan Neaw', price: 1590, imageUrl: '/images/Painted Terracotta Pot.png' },
  { id: 8, name: 'Embroidered Silk Scarf', artisan: 'Artisan Buelee', price: 1690, imageUrl: '/images/Embroidered Silk Scarf.png' },
];

const salesData = [
  { name: 'Jan', Sales: 12000, Revenue: 21000 },
  { name: 'Feb', Sales: 19000, Revenue: 28000 },
  { name: 'Mar', Sales: 15000, Revenue: 35000 },
  { name: 'Apr', Sales: 27800, Revenue: 39080 },
  { name: 'May', Sales: 18900, Revenue: 48000 },
  { name: 'Jun', Sales: 23900, Revenue: 38000 },
  { name: 'Jul', Sales: 34900, Revenue: 43000 },
];

const demandForecastData = [
  { name: 'Mugs', forecast: 45 },
  { name: 'Vases', forecast: 30 },
  { name: 'Plates', forecast: 60 },
  { name: 'Boxes', forecast: 25 },
  { name: 'Scarves', forecast: 55 },
];

// --- SVG ICONS ---
const UploadIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg> );
const AppLogo = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg> );

// --- PAGE COMPONENTS ---
const AddProductPage = () => {
    const [productName, setProductName] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedContent, setGeneratedContent] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProductImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleGenerateListing = async () => {
        if (!productName || !productImage) {
            alert('Please provide a product name and an image.');
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            const mockResponse = {
                description: `This exquisite ${productName} is handcrafted with passion by local artisans. Using traditional techniques passed down through generations, each piece is unique and tells a story of cultural heritage. A perfect addition to any home, celebrating the beauty of skilled craftsmanship.`,
                tags: ['#Handmade', '#ArtisanCraft', '#HomeDecor', `#${productName.replace(/\s+/g, '')}`, '#CulturalHeritage'],
                priceSuggestion: `$${Math.floor(Math.random() * 50 + 25)} - $${Math.floor(Math.random() * 80 + 75)}`,
            };
            setGeneratedContent(mockResponse);
            setIsLoading(false);
        }, 2000);
    };

    return ( <div className="bg-gray-50 min-h-screen p-4 sm:p-8"><div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8"><h1 className="text-3xl font-bold text-gray-800 mb-2">Add New Product</h1><p className="text-gray-500 mb-8">Let AI be your creative partner. Describe your product and let's get started.</p><div className="grid grid-cols-1 lg:grid-cols-2 gap-8"><div className="space-y-6"><div><label htmlFor="productName" className="block text-sm font-semibold text-gray-700 mb-2">Product Name or a few words...</label>
    <input 
        type="text" 
        id="productName" 
        value={productName} 
        onChange={(e) => setProductName(e.target.value)} 
        placeholder="e.g., Hand-painted clay vase" 
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow text-gray-900" // <-- FIXED: Added text-gray-900
    />
    </div><div><label className="block text-sm font-semibold text-gray-700 mb-2">Upload Product Image</label><div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"><div className="space-y-1 text-center">{imagePreview ? ( <img src={imagePreview} alt="Product preview" className="mx-auto h-32 w-32 object-cover rounded-md" /> ) : ( <UploadIcon /> )}<div className="flex text-sm text-gray-600"><label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"><span>Upload a file</span><input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*"/></label><p className="pl-1">or drag and drop</p></div><p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p></div></div></div><button onClick={handleGenerateListing} disabled={isLoading} className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center">{isLoading && <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}{isLoading ? 'Generating...' : 'Generate Listing with AI ✨'}</button></div><div className={`p-6 rounded-lg transition-opacity duration-500 ${generatedContent ? 'bg-gray-100 opacity-100' : 'bg-gray-50 opacity-50'}`}><h2 className="text-xl font-semibold text-gray-800 mb-4">AI Suggestions</h2>{generatedContent ? ( <div className="space-y-5"><div><h3 className="font-semibold text-gray-700">AI-Generated Description</h3><p className="text-gray-600 mt-1 text-sm bg-white p-3 rounded-md shadow-sm">{generatedContent.description}</p></div><div><h3 className="font-semibold text-gray-700">AI-Suggested Price</h3><p className="text-gray-800 mt-1 text-lg font-bold bg-white p-3 rounded-md shadow-sm">{generatedContent.priceSuggestion}</p></div><div><h3 className="font-semibold text-gray-700">AI-Generated Tags</h3><div className="flex flex-wrap gap-2 mt-2">{generatedContent.tags.map(tag => ( <span key={tag} className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span> ))}</div></div></div> ) : ( <div className="text-center text-gray-500 pt-16"><p>Your AI-generated content will appear here.</p></div> )}</div></div></div></div> );
};

const ProductDiscoveryPage = () => {
    return ( <div className="bg-gray-50 p-4 sm:p-8"><div className="max-w-7xl mx-auto"><h1 className="text-center text-4xl font-bold text-gray-800 mb-4">Discover Unique Crafts</h1><p className="text-center text-lg text-gray-500 mb-12">Recommended For You, by Artisans Around the World</p><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">{mockProducts.map(product => ( <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-all duration-300">
        <div className="w-full h-56 relative">
            <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
        </div>
        <div className="p-5"><h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3><p className="text-sm text-gray-500 mb-3">{product.artisan}</p><p className="text-xl font-bold text-gray-900">${(product.price / 100).toFixed(2)}</p><button className="mt-4 w-full bg-gray-800 text-white font-semibold py-2 rounded-lg hover:bg-gray-900 transition-colors">View Product</button></div>
    </div> ))}</div></div></div> );
};

const AnalyticsDashboardPage = () => {
     const StatCard = ({ title, value, change, icon }) => ( <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center justify-between"><div><p className="text-sm font-medium text-gray-500">{title}</p><p className="text-3xl font-bold text-gray-800">{value}</p>{change && <p className={`text-sm mt-1 ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{change}</p>}</div><div className="bg-indigo-100 p-3 rounded-full">{icon}</div></div> );
    return ( <div className="bg-gray-100 p-4 sm:p-8 min-h-screen"><div className="max-w-7xl mx-auto"><h1 className="text-3xl font-bold text-gray-800 mb-8">Artisan Analytics</h1><div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"><StatCard title="Total Revenue" value="$72,540" change="+12.5% this month" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>} /><StatCard title="Top Selling Product" value="$7,790" change="Earthenware Mugs" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}/><StatCard title="New Orders" value="182" change="+5% this week" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}/></div><div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"><div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg"><h3 className="font-semibold text-gray-700 mb-4">Sales & Revenue Overview</h3><ResponsiveContainer width="100%" height={300}><LineChart data={salesData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Legend /><Line type="monotone" dataKey="Sales" stroke="#8884d8" activeDot={{ r: 8 }} /><Line type="monotone" dataKey="Revenue" stroke="#82ca9d" /></LineChart></ResponsiveContainer></div><div className="bg-white p-6 rounded-2xl shadow-lg"><h3 className="font-semibold text-gray-700 mb-4">Demand Forecast</h3><ResponsiveContainer width="100%" height={300}><BarChart data={demandForecastData} layout="vertical"><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" /><YAxis type="category" dataKey="name" width={60} /><Tooltip /><Bar dataKey="forecast" fill="#8884d8" /></BarChart></ResponsiveContainer></div></div></div></div> );
};

// --- MAIN APP CONTROLLER ---

export default function Home() {
    const [currentPage, setCurrentPage] = useState('addProduct'); // 'addProduct', 'discover', 'analytics'
    const renderPage = () => {
        switch (currentPage) {
            case 'addProduct': return <AddProductPage />;
            case 'discover': return <ProductDiscoveryPage />;
            case 'analytics': return <AnalyticsDashboardPage />;
            default: return <AddProductPage />;
        }
    };
    const NavLink = ({ page, children }) => ( <button onClick={() => setCurrentPage(page)} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === page ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>{children}</button> );

    return (
        <div className="font-sans">
            <nav className="bg-gray-800"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="flex items-center justify-between h-16"><div className="flex items-center"><div className="flex-shrink-0"><AppLogo /></div><span className="text-white ml-3 text-xl font-bold">ArtisanAI</span></div><div className="hidden md:block"><div className="ml-10 flex items-baseline space-x-4"><NavLink page="addProduct">Artisan: Add Product</NavLink><NavLink page="discover">Customer: Discovery</NavLink><NavLink page="analytics">Artisan: Analytics</NavLink></div></div></div></div></nav>
            <main>{renderPage()}</main>
        </div>
    );
}

