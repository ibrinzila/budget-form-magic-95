
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
import { useState } from "react";
import { Link } from "react-router-dom";

export default function NewProjectPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    budget: '',
    startDate: '',
    endDate: '',
    status: 'active'
  });
  
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would submit the project data
    console.log("Project data:", formData);
    // In a real app, we would redirect to the new project page after creation
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Project</h1>
          <p className="text-muted-foreground">Set up a new procurement project</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Project Name</Label>
                    <Input 
                      id="name" 
                      value={formData.name} 
                      onChange={(e) => handleChange('name', e.target.value)} 
                      placeholder="Enter project name" 
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    value={formData.description} 
                    onChange={(e) => handleChange('description', e.target.value)} 
                    placeholder="Describe the purpose and scope of this project" 
                    rows={3} 
                    required 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-muted-foreground">$</span>
                      </div>
                      <Input 
                        id="budget" 
                        type="number" 
                        min="0" 
                        step="100" 
                        value={formData.budget} 
                        onChange={(e) => handleChange('budget', e.target.value)} 
                        className="pl-7" 
                        placeholder="0" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input 
                      id="startDate" 
                      type="date" 
                      value={formData.startDate} 
                      onChange={(e) => handleChange('startDate', e.target.value)} 
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input 
                      id="endDate" 
                      type="date" 
                      value={formData.endDate} 
                      onChange={(e) => handleChange('endDate', e.target.value)} 
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    defaultValue="active" 
                    onValueChange={(value) => handleChange('status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Team</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center border-2 border-dashed rounded-md py-8 text-center">
                <div className="space-y-2">
                  <div className="text-muted-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <h3 className="text-base font-medium">Team member management</h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                    Team member management functionality will be available in a future update.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Link to="/projects">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit">Create Project</Button>
          </div>
        </div>
      </form>
    </Layout>
  );
}
