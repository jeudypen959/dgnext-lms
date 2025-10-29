import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

const Settings = () => {
  const { user, updatePassword, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (passwords.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    await updatePassword(passwords.newPassword);
    setLoading(false);
    setPasswords({ newPassword: '', confirmPassword: '' });
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast.error('Account deletion is not implemented in this demo');
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <div className="space-y-6">
          {/* Account Settings */}
          <Card className="p-6 card-gradient border-border">
            <h2 className="text-xl font-bold mb-4">Account Settings</h2>
            <div className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="bg-muted"
                />
              </div>

              <Separator />

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <h3 className="font-semibold">Change Password</h3>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                    placeholder="Enter new password"
                    className="bg-background"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwords.confirmPassword}
                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                    className="bg-background"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </Button>
              </form>
            </div>
          </Card>

          {/* Appearance */}
          <Card className="p-6 card-gradient border-border">
            <h2 className="text-xl font-bold mb-4">Appearance</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Toggle dark mode theme</p>
                </div>
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                />
              </div>

              <Separator />

              <div>
                <Label>Language</Label>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant={language === 'en' ? 'default' : 'outline'}
                    onClick={() => setLanguage('en')}
                    className={language === 'en' ? 'bg-secondary hover:bg-secondary/90 text-secondary-foreground' : ''}
                  >
                    English
                  </Button>
                  <Button
                    variant={language === 'kh' ? 'default' : 'outline'}
                    onClick={() => setLanguage('kh')}
                    className={language === 'kh' ? 'bg-secondary hover:bg-secondary/90 text-secondary-foreground' : ''}
                  >
                    ភាសាខ្មែរ
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Notifications */}
          <Card className="p-6 card-gradient border-border">
            <h2 className="text-xl font-bold mb-4">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive course updates via email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Course Reminders</Label>
                  <p className="text-sm text-muted-foreground">Get reminders about incomplete courses</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Newsletter</Label>
                  <p className="text-sm text-muted-foreground">Subscribe to our monthly newsletter</p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="p-6 card-gradient border-border border-destructive">
            <h2 className="text-xl font-bold mb-4 text-destructive">Danger Zone</h2>
            <div className="space-y-4">
              <div>
                <Label>Sign Out</Label>
                <p className="text-sm text-muted-foreground mb-2">Sign out from your account</p>
                <Button
                  variant="outline"
                  onClick={signOut}
                >
                  Sign Out
                </Button>
              </div>

              <Separator />

              <div>
                <Label className="text-destructive">Delete Account</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Permanently delete your account and all data
                </p>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
