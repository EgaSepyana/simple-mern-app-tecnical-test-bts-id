import LoginForm from '../components/auth/LoginForm';
import Logo from '../assets/Logo.svg';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl shadow-xl mb-4">
            <img src={Logo} alt="Logo" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">Selamat datang kembali</h1>
          <p className="text-slate-400 text-sm">Masuk ke akun Anda</p>
        </div>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
