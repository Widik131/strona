import React, { useState } from 'react';
import { Home, Search, Shield, MessageCircle, ArrowRight, X, Mail, Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleStartClick = () => {
    setShowModal(true);
    setIsSignIn(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignIn) {
      // Here you would typically make an API call to sign in
      navigate('/search');
    } else {
      if (formData.password !== formData.confirmPassword) {
        setError('Hasła nie są identyczne');
        return;
      }

      if (formData.password.length < 6) {
        setError('Hasło musi mieć co najmniej 6 znaków');
        return;
      }

      // Here you would typically make an API call to register the user
      navigate('/profile-setup');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Home className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-blue-600">Cooliv</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                setShowModal(true);
                setIsSignIn(true);
              }}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Zaloguj się
            </button>
            <button
              onClick={handleStartClick}
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors"
            >
              Rozpocznij
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Znajdź Idealnego Współlokatora
              </h1>
              <p className="text-blue-100 text-lg mb-8">
                Połącz się z kompatybilnymi współlokatorami w Twojej okolicy. Nasz inteligentny system dobierania pomoże Ci znaleźć idealnego partnera do mieszkania na podstawie stylu życia, preferencji i nawyków.
              </p>
              <button 
                onClick={handleStartClick}
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors inline-flex items-center"
              >
                Rozpocznij Szukanie <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80"
                alt="Szczęśliwi współlokatorzy"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {isSignIn ? 'Zaloguj się' : 'Utwórz konto'}
            </h2>
            
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isSignIn && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Imię i nazwisko
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      required={!isSignIn}
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Jan Kowalski"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="jan@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hasło
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={isSignIn ? "Twoje hasło" : "Minimum 6 znaków"}
                  />
                </div>
              </div>

              {!isSignIn && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Potwierdź hasło
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="password"
                      name="confirmPassword"
                      required={!isSignIn}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Powtórz hasło"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                {isSignIn ? 'Zaloguj się' : 'Utwórz konto'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsSignIn(!isSignIn)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  {isSignIn ? 'Nie masz konta? Zarejestruj się' : 'Masz już konto? Zaloguj się'}
                </button>
              </div>

              {!isSignIn && (
                <p className="text-sm text-gray-600 text-center mt-4">
                  Klikając "Utwórz konto" akceptujesz nasz{' '}
                  <a href="#" className="text-blue-600 hover:underline">Regulamin</a>
                  {' '}oraz{' '}
                  <a href="#" className="text-blue-600 hover:underline">Politykę Prywatności</a>
                </p>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">Dlaczego Warto Wybrać Cooliv?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Inteligentne Dopasowanie</h3>
              <p className="text-gray-600">Nasz algorytm znajduje kompatybilnych współlokatorów na podstawie Twojego stylu życia i preferencji.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Zweryfikowane Profile</h3>
              <p className="text-gray-600">Wszyscy użytkownicy są weryfikowani dla Twojego bezpieczeństwa i spokoju ducha.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Łatwa Komunikacja</h3>
              <p className="text-gray-600">Wbudowany system wiadomości ułatwiający kontakt z potencjalnymi współlokatorami.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">Jak To Działa</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-4">1</div>
              <h3 className="text-xl font-semibold mb-4">Utwórz Profil</h3>
              <p className="text-gray-600">Opowiedz nam o sobie, swoich preferencjach i o tym, czego szukasz we współlokatorze.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-4">2</div>
              <h3 className="text-xl font-semibold mb-4">Przeglądaj Dopasowania</h3>
              <p className="text-gray-600">Przeglądaj profile kompatybilnych współlokatorów w Twojej okolicy i nawiąż z nimi kontakt.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-4">3</div>
              <h3 className="text-xl font-semibold mb-4">Spotkaj się i Zdecyduj</h3>
              <p className="text-gray-600">Spotkaj potencjalnych współlokatorów i znajdź idealnego partnera do wspólnego mieszkania.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">Co Mówią Nasi Użytkownicy</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-gray-600 mb-6">"Znalazłam idealnego współlokatora w ciągu tygodnia! System dopasowania naprawdę działa, mieszkamy razem szczęśliwie od 6 miesięcy."</p>
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
                  alt="Anna"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">Anna Kowalska</h4>
                  <p className="text-gray-500">Warszawa</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-gray-600 mb-6">"System weryfikacji dał mi spokój ducha podczas szukania współlokatora. Znalazłem kogoś godnego zaufania!"</p>
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
                  alt="Michał"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">Michał Nowak</h4>
                  <p className="text-gray-500">Kraków</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <Home className="w-6 h-6" />
                <span className="text-xl font-bold">Cooliv</span>
              </div>
              <p className="text-gray-400">Znajdź idealnego współlokatora.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">Firma</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">O nas</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Kariera</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Kontakt</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Zasoby</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Porady Bezpieczeństwa</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Prawne</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Polityka Prywatności</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Regulamin</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Polityka Cookies</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Cooliv. Wszelkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;