import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
interface CardProps {
  cardNo: string;
  expiry: string;
  cvv: string;
}

export function YourCards({ cards }: { cards: CardProps[] }) {
  console.log(cards);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Cards</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cards.length === 0 && (
            <span className="text-muted-foreground">No Card added!</span>
          )}

          {cards.map((card) => (
            <div
              key={card.cardNo}
              className="flex items-center space-x-4 p-4 bg-secondary rounded-lg"
            >
              <CreditCard className="h-6 w-6 text-primary" />
              <div>
                <p className="font-medium">CardNo:{card.cardNo}</p>
                <p className="font-medium">Expires: {card.expiry}</p>
                <p className="text-sm text-muted-foreground">CVV: {card.cvv}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
