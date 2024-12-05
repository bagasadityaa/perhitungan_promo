"use client";
import { useState } from "react";

const PromoCalculation = () => {
  const [basePrice, setBasePrice] = useState("");
  const [results, setResults] = useState([]);


  const promotions = [
    {
      sensitivity: "Lower",
      tiers: [
        { minOrder: 45000, discount: 0.15, maxDisc: 14000 },
        { minOrder: 85000, discount: 0.1, maxDisc: 17000 },
        { minOrder: 170000, discount: 0.15, maxDisc: 51000 },
      ],
    },
    {
      sensitivity: "Middle",
      tiers: [
        { minOrder: 45000, discount: 0.4, maxDisc: 36000 },
        { minOrder: 85000, discount: 0.35, maxDisc: 60000 },
        { minOrder: 170000, discount: 0.4, maxDisc: 136000 },
      ],
    },
    {
      sensitivity: "Upper",
      tiers: [
        { minOrder: 55000, discount: 0.4, maxDisc: 44000 },
        { minOrder: 105000, discount: 0.4, maxDisc: 84000 },
        { minOrder: 210000, discount: 0.4, maxDisc: 168000 },
      ],
    },
  ];

  const subsidyGojek = 0.45;
  const subsidyResto = 0.55;

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  const calculatePromo = () => {
    const promoResults = promotions.map(({ sensitivity, tiers }) => {
      const calculatedTiers = tiers.map(({ minOrder, discount, maxDisc }) => {
        const actualDiscount = Math.min(basePrice * discount, maxDisc);
        const restoSubsidy = actualDiscount * subsidyResto;
        const gojekSubsidy = actualDiscount * subsidyGojek;
        const adminFeePercentage = 0.2; // Biaya admin Gojek 20%
        // Harga bersih yang diterima setelah mengurangi subsidi dan biaya admin
        const netEarnings = basePrice - restoSubsidy;
        const nett = netEarnings - 0.2;
  
        return {
          minOrder: formatRupiah(minOrder),
          discount: `${(discount * 100).toFixed(0)}%`,
          maxDisc: formatRupiah(maxDisc),
          restoSubsidy: formatRupiah(restoSubsidy),
          gojekSubsidy: formatRupiah(gojekSubsidy),
          
        
          nett: formatRupiah(nett),
        };
      });
  
      return { sensitivity, calculatedTiers };
    });
  
    setResults(promoResults);
  };
  

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Promo Calculation</h1>
      <div className="mb-4">
        <label className="block font-medium">Base Price (Harga Awal):</label>
        <input
          className="border rounded p-2 w-full text-black"
          type="number"
          value={basePrice}
          onChange={(e) => setBasePrice(parseFloat(e.target.value))}
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={calculatePromo}
      >
        Calculate
      </button>
      <div className="mt-6">
        {results.map(({ sensitivity, calculatedTiers }) => (
          <div key={sensitivity} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{sensitivity} Sensitivity</h2>
            <table className="border-collapse border border-gray-400 w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-4 text-black py-2">Min Order</th>
                  <th className="border border-gray-400 px-4 text-black py-2">Discount (%)</th>
                  <th className="border border-gray-400 px-4 text-black py-2">Max Disc</th>
                  <th className="border border-gray-400 px-4 text-black py-2">Restoran Subsidy</th>
                  <th className="border border-gray-400 px-4 text-black py-2">Gojek Subsidy</th>
                  
                  
                  <th className="border border-gray-400 px-4 text-black py-2">Nett</th>
                </tr>
              </thead>
              <tbody>
                {calculatedTiers.map((tier, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-gray-400 px-4 py-2">{tier.minOrder}</td>
                    <td className="border border-gray-400 px-4 py-2">{tier.discount}</td>
                    <td className="border border-gray-400 px-4 py-2">{tier.maxDisc}</td>
                    <td className="border border-gray-400 px-4 py-2">{tier.restoSubsidy}</td>
                    <td className="border border-gray-400 px-4 py-2">{tier.gojekSubsidy}</td>
                    
                    
                    <td className="border border-gray-400 px-4 py-2">{tier.nett}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoCalculation;
