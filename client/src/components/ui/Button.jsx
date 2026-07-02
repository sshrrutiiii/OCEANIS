function Button({ children, variant = "primary" }) {
  const base =
    "px-6 py-3 rounded-xl font-semibold transition-all duration-300";

  const styles = {
    primary:
      "bg-cyan-500 text-slate-900 hover:bg-cyan-400 shadow-lg shadow-cyan-500/30",

    secondary:
      "border border-cyan-500 text-white hover:bg-cyan-500/10",
  };

  return (
    <button className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  );
}

export default Button;