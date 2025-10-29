import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Checkout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const courseId = searchParams.get('course') || '';
  const courseTitle = searchParams.get('title') || 'Course';
  const price = searchParams.get('price') || '0';

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to continue');
      navigate('/auth');
      return;
    }

    setLoading(true);

    try {
      // Create payment record
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          user_id: user.id,
          course_id: courseId,
          amount: parseFloat(price.replace('$', '')),
          status: 'completed',
          payment_method: 'card',
        });

      if (paymentError) throw paymentError;

      // Create enrollment
      const { error: enrollmentError } = await supabase
        .from('enrollments')
        .insert({
          user_id: user.id,
          course_id: courseId,
          progress: 0,
          completed_lessons: 0,
        });

      if (enrollmentError) throw enrollmentError;

      toast.success('Payment successful! You are now enrolled.');
      navigate(`/learning/${courseId}`);
    } catch (error: any) {
      toast.error(error.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card className="p-6 card-gradient border-border">
              <h2 className="text-xl font-bold mb-6">Payment Information</h2>
              <form onSubmit={handlePayment} className="space-y-6">
                <div>
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    type="text"
                    placeholder="John Doe"
                    required
                    className="bg-background"
                  />
                </div>

                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      required
                      className="bg-background pr-10"
                    />
                    <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      type="text"
                      placeholder="123"
                      maxLength={4}
                      required
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="flex items-center text-sm text-muted-foreground">
                  <Lock className="h-4 w-4 mr-2" />
                  Your payment information is secure and encrypted
                </div>

                <Button
                  type="submit"
                  className="w-full bg-success hover:bg-success/90 text-success-foreground"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : `Pay ${price}`}
                </Button>
              </form>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 card-gradient border-border sticky top-20">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Course</p>
                  <p className="font-semibold">{courseTitle}</p>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-secondary">{price}</span>
                </div>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-semibold mb-2">What's included:</p>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>✓ Lifetime access</li>
                    <li>✓ All course materials</li>
                    <li>✓ Certificate of completion</li>
                    <li>✓ 24/7 support</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
