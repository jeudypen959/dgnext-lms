import { useEffect } from 'react';
import Lottie from 'lottie-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  lottieData?: any;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const CustomModal = ({
  isOpen,
  onClose,
  title,
  description,
  type = 'info',
  lottieData,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}: CustomModalProps) => {
  const defaultLottieData = {
    success: null, // You can add default Lottie animations here
    error: null,
    warning: null,
    info: null,
  };

  const typeColors = {
    success: 'text-success',
    error: 'text-destructive',
    warning: 'text-accent',
    info: 'text-secondary',
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card">
        <DialogHeader>
          {lottieData && (
            <div className="mx-auto mb-4 w-32 h-32">
              <Lottie animationData={lottieData} loop={true} />
            </div>
          )}
          <DialogTitle className={`text-center text-2xl ${typeColors[type]}`}>
            {title}
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-center space-x-4 mt-4">
          {onConfirm && (
            <Button
              onClick={onConfirm}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              {confirmText}
            </Button>
          )}
          <Button
            onClick={onClose}
            variant="outline"
          >
            {cancelText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
