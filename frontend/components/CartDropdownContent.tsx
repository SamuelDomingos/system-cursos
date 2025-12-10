import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";

const CartDropdownContent = () => {
  const { cartItems, cartTotal } = useCart();

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="w-auto p-4">
        <p className="text-sm text-center text-gray-500 mb-4">
          Your cart is empty. Keep shopping
        </p>

        <Link href="/cart">
          <Button variant="default" className="w-full">
            Ver Carrinho
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-auto p-4">
      {cartItems.slice(0, 5).map((item) => (
        <div key={item.id} className="flex items-center gap-4 mb-4">
          <img
            src={item.imageSrc}
            alt={item.title}
            className="w-16 h-16 object-cover rounded-md"
          />
          <div className="flex-1">
            <h4 className="text-sm font-medium line-clamp-1">{item.title}</h4>
            <p className="text-xs text-gray-500 line-clamp-2">
              {item.description}
            </p>
            <p className="text-sm font-semibold">
              {formatCurrency(item.price)}
            </p>
          </div>
        </div>
      ))}
      {cartItems.length > 5 && (
        <p className="text-xs text-gray-500 text-center mb-4">
          +{cartItems.length - 5} itens
        </p>
      )}
      <Separator className="my-4" />
      <div className="flex justify-between items-center mb-4">
        <span className="text-base font-semibold">Total:</span>
        <span className="text-base font-bold">{formatCurrency(cartTotal)}</span>
      </div>
      <Link href="/cart">
        <Button variant="default" className="w-full">
          Ver Carrinho
        </Button>
      </Link>
    </div>
  );
};

export default CartDropdownContent;
