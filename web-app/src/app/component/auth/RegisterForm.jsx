// components/auth/RegisterForm.jsx
import { useState } from 'react';
import Button from '@/component/ui/Button';
import Input from '@/component/ui/Input';
import Select from '@/component/ui/Select';

export default function RegisterForm({ onSubmit, loading }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '', // Ajout du champ username
        email: '',
        password: '',
        confirmPassword: '',
        role: 'PLAYER', // Valeur par défaut
        phone: ''
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        // Validation du nom et prénom
        if (formData.firstName.trim().length < 2) {
            newErrors.firstName = 'Le prénom doit contenir au moins 2 caractères';
        }

        if (formData.lastName.trim().length < 2) {
            newErrors.lastName = 'Le nom doit contenir au moins 2 caractères';
        }

        // Validation du username
        if (formData.username.trim().length < 4) {
            newErrors.username = 'Le nom d\'utilisateur doit contenir au moins 4 caractères';
        }


        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Adresse e-mail invalide';
        }

        // Validation du mot de passe
        if (formData.password.length < 8) {
            newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
        }

        // Validation du numéro de téléphone (optionnel mais doit être valide si rempli)
        if (formData.phone && !/^\+?[0-9]{10,15}$/.test(formData.phone)) {
            newErrors.phone = 'Numéro de téléphone invalide';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Remove confirmPassword before submitting
            const { confirmPassword, ...submissionData } = formData;
            onSubmit(submissionData);
        }
    };

    const roleOptions = [
        { value: 'PLAYER', label: 'PLAYER' }
        // Généralement, on n'autorise pas l'inscription en tant qu'admin ou organisateur directement
        // Les administrateurs pourront promouvoir les utilisateurs plus tard
    ];

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        label="Prénom"
                        placeholder="Jean"
                        error={errors.firstName}
                    />
                </div>
                <div>
                    <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        label="Nom"
                        placeholder="Dupont"
                        error={errors.lastName}
                    />
                </div>
            </div>

            <div>
                <Input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    label="Nom d'utilisateur"
                    placeholder="Votre pseudo"
                    error={errors.username}
                />
            </div>

            <div>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    label="Adresse e-mail"
                    placeholder="votre@email.com"
                    error={errors.email}
                />
            </div>

            <div>
                <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    label="Téléphone (optionnel)"
                    placeholder="+33 6 12 34 56 78"
                    error={errors.phone}
                />
            </div>

            <div>
                <Select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    label="Rôle"
                    options={roleOptions}
                    required
                />
                <p className="mt-1 text-xs text-gray-500">
                    Note: Les rôles d'administrateur et d'organisateur nécessitent une validation par l'administration.
                </p>
            </div>

            <div>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    label="Mot de passe"
                    placeholder="••••••••"
                    error={errors.password}
                />
                <p className="mt-1 text-xs text-gray-500">
                    Minimum 8 caractères, incluant lettres et chiffres.
                </p>
            </div>

            <div>
                <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    label="Confirmer le mot de passe"
                    placeholder="••••••••"
                    error={errors.confirmPassword}
                />
            </div>

            <div className="flex items-center">
                <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                    J'accepte les {' '}
                    <a href="#" className="text-blue-600 hover:text-blue-500">
                        conditions d'utilisation
                    </a>
                    {' '} et la {' '}
                    <a href="#" className="text-blue-600 hover:text-blue-500">
                        politique de confidentialité
                    </a>
                </label>
            </div>

            <div>
                <Button
                    type="submit"
                    fullWidth
                    variant="primary"
                    loading={loading}
                >
                    {loading ? 'Inscription en cours...' : 'S\'inscrire'}
                </Button>
            </div>
        </form>
    );
}