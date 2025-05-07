
import "./globals.css";
import { AuthProvider } from '@/hooks/useAuth';


export default function ClientLayout({ children }) {
    return (

            <AuthProvider>
                {children}

            </AuthProvider>
    );
}