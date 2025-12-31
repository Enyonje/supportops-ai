import React, { useEffect } from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.success("Payment successful! 🎉 Your plan is now active.");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white px-6">
      <div className="max-w-md w-full border border-white/10 rounded-3xl p-10 bg-white/5 backdrop-blur">
        
        <div className="flex flex-col items-center text-center gap-6">
          <CheckCircle size={64} className="text-green-500" />

          <h1 className="text-3xl font-black uppercase italic">
            Payment Successful
          </h1>

          <p className="text-slate-400 leading-relaxed">
            Thank you for upgrading to <span className="text-white font-semibold">SupportOps Pro</span>.
            Your account has been activated and you now have access to all premium features.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 w-full flex items-center justify-center gap-2
                       bg-blue-600 hover:bg-blue-500 transition-all
                       py-4 rounded-xl font-bold shadow-lg"
          >
            Go to Dashboard
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default SuccessPage;
