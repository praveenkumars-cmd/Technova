import React, { useState } from 'react';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { CreditCard, ShieldCheck, Download, CheckCircle } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { formatCurrency } from '../../utils/formatters';

export const PaymentPage: React.FC = () => {
  const { showToast } = useNotifications();
  const [isPaid, setIsPaid] = useState(false);
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('***');

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPaid(true);
    showToast('Payment Successful', 'Transaction TXN-99812 settled via Stripe Health Gateway', 'success');
  };

  const handleDownloadInvoice = () => {
    showToast('Invoice Downloaded', 'Official receipt PDF saved to downloads', 'info');
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Billing & Insurance Copay Portal
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Review consultation invoices, insurance claims coverage, and make online payments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bill Summary */}
        <Card className="md:col-span-1 p-6 flex flex-col justify-between">
          <div>
            <CardTitle className="mb-4">Invoice Statement (INV-4402)</CardTitle>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Cardiology Consultation:</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{formatCurrency(180)}</span>
              </div>
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                <span>Insurance Coverage (Aetna):</span>
                <span className="font-bold">-{formatCurrency(150)}</span>
              </div>
              <div className="flex justify-between py-3 border-t border-b border-slate-200 dark:border-slate-800 font-extrabold text-base text-slate-900 dark:text-slate-100">
                <span>Patient Copay Due:</span>
                <span className="text-blue-600 dark:text-blue-400">{formatCurrency(30)}</span>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-xs text-blue-800 dark:text-blue-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
              <span>Claim status: Verified by Aetna Choice POS II</span>
            </div>
          </div>

          {isPaid && (
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-6"
              leftIcon={<Download className="w-4 h-4" />}
              onClick={handleDownloadInvoice}
            >
              Download PDF Receipt
            </Button>
          )}
        </Card>

        {/* Payment Form */}
        <Card className="md:col-span-2 p-6">
          {isPaid ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-4 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mb-4 animate-bounce">
                <CheckCircle className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                Payment Completed!
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1 mb-6">
                Your out-of-pocket copay of {formatCurrency(30)} has been processed. Transaction ID: TXN-99812.
              </p>
              <Button variant="success" size="md" onClick={handleDownloadInvoice}>
                Download Paid Receipt
              </Button>
            </div>
          ) : (
            <form onSubmit={handlePayNow} className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <CardTitle>Enter Payment Details</CardTitle>
                <Badge variant="primary">Stripe Secure 256-bit</Badge>
              </div>

              <Input
                label="Cardholder Name"
                defaultValue="Alexander Wright"
                required
              />

              <Input
                label="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                leftIcon={<CreditCard className="w-4 h-4" />}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expiration Date"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                  required
                />
                <Input
                  label="CVV / CVC"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  type="password"
                  required
                />
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500">Total Payable: <strong>{formatCurrency(30)}</strong></span>
                <Button type="submit" variant="glow" size="md" leftIcon={<CreditCard className="w-4 h-4" />}>
                  Pay {formatCurrency(30)} Now
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};
