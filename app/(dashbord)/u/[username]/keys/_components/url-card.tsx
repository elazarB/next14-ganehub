import { Input } from "@/components/ui/input";
import { CopyButton } from "./copy-button";

interface UrlCardProps {
  value: string |null
}

export const UrlCard = ({
  value,
}:UrlCardProps) => {
  return ( 
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center gap-x-10">
        <p className="font-semibold shrink-0">
          Server URL
        </p>
        <div className="space-y-2 w-full">
          <div className="flex items-center gap-x-2 w-full">
            <Input 
            disabled
            value={value || ''}
            placeholder="Server URL"
            />
            <CopyButton 
              value={value || ''}
            />
          </div>
        </div>
      </div>
    </div>
   );
}
 