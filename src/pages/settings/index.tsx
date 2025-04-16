
import { Layout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { THRESHOLD_LEVELS } from "@/types";
import { useState } from "react";

export default function SettingsPage() {
  const [thresholds, setThresholds] = useState({
    low: THRESHOLD_LEVELS.low,
    medium: THRESHOLD_LEVELS.medium,
    high: THRESHOLD_LEVELS.high
  });

  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application preferences</p>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="general">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="thresholds">Procurement Thresholds</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="ocr">OCR & AI Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure your organization and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" placeholder="Your Company" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Input id="currency" defaultValue="USD" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-approval-email">Default Approval Email</Label>
                  <Input id="default-approval-email" type="email" placeholder="approvals@example.com" />
                </div>
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="thresholds">
            <Card>
              <CardHeader>
                <CardTitle>Procurement Thresholds</CardTitle>
                <CardDescription>
                  Configure thresholds for procurement approvals
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="low-threshold">Low Threshold (Green)</Label>
                    <Input 
                      id="low-threshold" 
                      type="number" 
                      value={thresholds.low} 
                      onChange={(e) => setThresholds({...thresholds, low: Number(e.target.value)})}
                    />
                    <p className="text-xs text-muted-foreground">Forms below this amount</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medium-threshold">Medium Threshold (Yellow)</Label>
                    <Input 
                      id="medium-threshold" 
                      type="number" 
                      value={thresholds.medium} 
                      onChange={(e) => setThresholds({...thresholds, medium: Number(e.target.value)})}
                    />
                    <p className="text-xs text-muted-foreground">Forms between low and medium</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="high-threshold">High Threshold (Red)</Label>
                    <Input 
                      id="high-threshold" 
                      type="number" 
                      value={thresholds.high} 
                      onChange={(e) => setThresholds({...thresholds, high: Number(e.target.value)})}
                    />
                    <p className="text-xs text-muted-foreground">Forms above medium threshold</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  Notification settings will be available in a future update
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ocr">
            <Card>
              <CardHeader>
                <CardTitle>OCR & AI Settings</CardTitle>
                <CardDescription>
                  Configure OCR and AI features for document scanning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  OCR and AI settings will be available in a future update
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
