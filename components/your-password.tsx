import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
interface Password {
  website: string;
  username: string;
  password: string;
}
export function YourPassword({ passwords }: { passwords: Password[] }) {
  console.log(passwords);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Passwords</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {passwords.length===0 && <span className="text-muted-foreground">No Password added!</span>}
          {passwords.map((password, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 bg-secondary rounded-lg"
            >
              <Lock className="h-6 w-6 text-primary" />
              <div>
                <p className="font-medium">{password.website}</p>
                <p className="text-sm text-muted-foreground">
                  Username: {password.username}
                </p>
                <p className="font-medium">Password:{password.password}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
