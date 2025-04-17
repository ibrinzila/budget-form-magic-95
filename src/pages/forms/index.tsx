
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout";
import { ProcurementCard } from "@/components/forms/procurement-card";
import { procurementForms } from "@/data/mockData";
import { Link } from "react-router-dom";

export default function FormsPage() {
  return (
    <Layout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Procurement Forms</h1>
          <p className="text-muted-foreground">Create and manage procurement request forms.</p>
        </div>
        <Link to="/forms/new">
          <Button>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Form
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {procurementForms.map(form => (
          <ProcurementCard key={form.id} form={form} />
        ))}
      </div>
    </Layout>
  );
}
