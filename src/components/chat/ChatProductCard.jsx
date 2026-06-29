import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCart, Star, Check } from "lucide-react";
import { inr } from "@/lib/format";
import { useStore } from "@/context/StoreContext";
import { motion, AnimatePresence } from "motion/react";

/**
 * ChatProductCard — compact product card rendered inside AI chat messages.
 */
export function ChatProductCard({ product }) {
  const { addToCart } = useStore();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="chat-product-card group relative flex items-center gap-3 rounded-xl border border-border/50 bg-background/60 backdrop-blur-md p-3 transition-all duration-300 hover:border-brand/60 hover:shadow-[0_0_20px_rgba(47,141,70,0.15)] hover:bg-background/80 overflow-hidden"
    >
      {/* Subtle glowing orb in background on hover */}
      <div className="absolute -right-8 -top-8 size-24 rounded-full bg-brand/20 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

      <NavLink
        to={`/products/${product.id}`}
        className="shrink-0 overflow-hidden rounded-lg relative z-10 shadow-sm"
      >
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-16 w-16 object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </NavLink>

      <div className="flex flex-1 min-w-0 flex-col gap-1 relative z-10">
        <NavLink to={`/products/${product.id}`}>
          <p className="text-xs font-medium text-foreground line-clamp-2 leading-tight hover:text-brand transition-colors">
            {product.title}
          </p>
        </NavLink>
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <Star className="size-2.5 fill-warning text-warning drop-shadow-sm" />
          <span className="font-medium text-foreground">{product.rating}</span>
          <span>({product.reviews.toLocaleString()})</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-sm font-semibold text-foreground tracking-tight">{inr(product.price)}</span>
          <button
            type="button"
            onClick={handleAdd}
            disabled={added}
            className={`relative flex items-center justify-center gap-1 overflow-hidden rounded-lg px-3 py-1.5 text-[10px] font-medium transition-all duration-300 active:scale-95 cursor-pointer ${
              added
                ? "bg-success text-white shadow-[0_0_10px_rgba(40,167,69,0.4)]"
                : "bg-brand text-brand-foreground hover:shadow-[0_0_12px_rgba(47,141,70,0.4)] hover:bg-brand/90"
            }`}
          >
            <AnimatePresence mode="wait">
              {added ? (
                <motion.div
                  key="check"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="flex items-center gap-1"
                >
                  <Check className="size-3" />
                  <span>Added</span>
                </motion.div>
              ) : (
                <motion.div
                  key="add"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="flex items-center gap-1"
                >
                  <ShoppingCart className="size-3" />
                  <span>Add</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
