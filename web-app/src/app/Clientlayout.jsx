
import "./globals.css";
import { AuthProvider } from '@/hooks/useAuth';
import { Toaster } from 'react-hot-toast';
import LayoutContent from "@/Provider";


export default function ClientLayout({ children }) {
    return (

            <AuthProvider>
                {children}

            </AuthProvider>
    );
}