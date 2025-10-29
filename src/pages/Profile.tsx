import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Calendar, Award } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    bio: '',
    avatar_url: '',
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      setProfile(data);
      setFormData({
        full_name: data.full_name || '',
        bio: data.bio || '',
        avatar_url: data.avatar_url || '',
      });
    } catch (error: any) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name.trim(),
          bio: formData.bio.trim(),
          avatar_url: formData.avatar_url.trim(),
        })
        .eq('id', user.id);

      if (error) throw error;

      toast.success('Profile updated successfully!');
      fetchProfile();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = () => {
    const name = formData.full_name || user?.email || 'U';
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info Card */}
          <Card className="lg:col-span-1 p-6 card-gradient border-border h-fit">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={formData.avatar_url} />
                <AvatarFallback className="text-2xl bg-secondary text-secondary-foreground">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold mb-2">{formData.full_name || 'Student'}</h2>
              <p className="text-sm text-muted-foreground mb-4">{user?.email}</p>

              <div className="w-full space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-t">
                  <span className="text-muted-foreground flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Joined
                  </span>
                  <span className="font-semibold">
                    {new Date(user?.created_at || Date.now()).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-t">
                  <span className="text-muted-foreground flex items-center">
                    <Award className="h-4 w-4 mr-2" />
                    Role
                  </span>
                  <span className="font-semibold capitalize">{profile?.role || 'Student'}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Edit Profile Form */}
          <Card className="lg:col-span-2 p-6 card-gradient border-border">
            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  placeholder="Your full name"
                  className="bg-background"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="bg-muted"
                />
                <p className="text-sm text-muted-foreground mt-1">Email cannot be changed</p>
              </div>

              <div>
                <Label htmlFor="avatar_url">Avatar URL</Label>
                <Input
                  id="avatar_url"
                  type="url"
                  value={formData.avatar_url}
                  onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                  placeholder="https://example.com/avatar.jpg"
                  className="bg-background"
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  className="bg-background resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
