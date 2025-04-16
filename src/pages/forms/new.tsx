
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { projects } from "@/data/mockData";
import { useState } from "react";
import { ThresholdBadge } from "@/components/ui/threshold-badge";
import { formatCurrency } from "@/lib/formatters";

export default function NewFormPage() {
  const [items, setItems] = useState([
    { id: "1", description: "", quantity: 1, unitPrice: 0, totalPrice: 0 },
  ]);
  const [totalAmount, setTotalAmount] = useState(0);

  const updateItem = (id: string, field: string, value: string | number) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === "quantity" || field === "unitPrice") {
          updatedItem.totalPrice =
            Number(field === "quantity" ? value : item.quantity) *
            Number(field === "unitPrice" ? value : item.unitPrice);
        }
        return updatedItem;
      }
      return item;
    });

    setItems(updatedItems);
    calculateTotal(updatedItems);
  };

  const calculateTotal = (currentItems: typeof items) => {
    const total = currentItems.reduce((sum, item) => sum + item.totalPrice, 0);
    setTotalAmount(total);
  };

  const addItem = () => {
    const newItem = {
      id: `${items.length + 1}`,
      description: "",
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      const updatedItems = items.filter((item) => item.id !== id);
      setItems(updatedItems);
      calculateTotal(updatedItems);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Procurement Form</h1>
          <p className="text-muted-foreground">Create a new procurement request</p>
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Form Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Form Title</Label>
                  <Input id="title" placeholder="Enter a title for this procurement" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project">Associated Project</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the purpose of this procurement"
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between">
              <span>Items</span>
              <ThresholdBadge amount={totalAmount} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-4 items-end border-b pb-4"
                >
                  <div className="col-span-12 md:col-span-5">
                    <Label htmlFor={`item-${item.id}-desc`}>Description</Label>
                    <Input
                      id={`item-${item.id}-desc`}
                      placeholder="Item description"
                      value={item.description}
                      onChange={(e) =>
                        updateItem(item.id, "description", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-4 md:col-span-2">
                    <Label htmlFor={`item-${item.id}-qty`}>Quantity</Label>
                    <Input
                      id={`item-${item.id}-qty`}
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(item.id, "quantity", parseInt(e.target.value) || 0)
                      }
                    />
                  </div>
                  <div className="col-span-4 md:col-span-2">
                    <Label htmlFor={`item-${item.id}-price`}>Unit Price</Label>
                    <Input
                      id={`item-${item.id}-price`}
                      type="number"
                      min="0"
                      value={item.unitPrice}
                      onChange={(e) =>
                        updateItem(item.id, "unitPrice", parseFloat(e.target.value) || 0)
                      }
                    />
                  </div>
                  <div className="col-span-3 md:col-span-2">
                    <Label>Total</Label>
                    <div className="bg-muted text-muted-foreground rounded-md h-10 px-3 py-2">
                      {formatCurrency(item.totalPrice)}
                    </div>
                  </div>
                  <div className="col-span-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      disabled={items.length <= 1}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      </svg>
                      <span className="sr-only">Remove item</span>
                    </Button>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={addItem}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Item
              </Button>

              <div className="flex justify-end">
                <div className="text-right">
                  <div className="text-sm text-muted-foreground mb-1">Total Amount:</div>
                  <div className="text-2xl font-bold">{formatCurrency(totalAmount)}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Document Upload</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md py-8 text-center">
              <div className="mb-3 text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <p className="text-sm font-medium mb-1">Drag & drop files here or click to browse</p>
              <p className="text-xs text-muted-foreground mb-3">
                Upload quotes, invoices or other supporting documents
              </p>
              <Button variant="outline" size="sm" className="relative">
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  multiple
                />
                Browse Files
              </Button>
            </div>
            <div className="mt-4 text-xs text-muted-foreground text-center">
              Our AI will scan your PDFs and images to extract information automatically
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline">Save as Draft</Button>
          <Button>Submit for Approval</Button>
        </div>
      </div>
    </Layout>
  );
}
