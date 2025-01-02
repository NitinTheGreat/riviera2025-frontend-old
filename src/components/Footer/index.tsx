import BufferSection from "../Header";
function Footer() {
  return (
    <footer className="bg-background text-white text-sm">
      <div className="flex flex-col items-center justify-center py-8">
        <p className="text-center">
          <span className="text-primary">Riviera 2025</span> |{" "}
          <span className="text-primary">VIT Vellore</span> |{" "}
          <span className="text-primary">Tamil Nadu</span> |{" "}
          <span className="text-primary">India</span>
        </p>
        <p className="text-center">
          <span className="text-primary">Privacy Policy</span> |{" "}
          <span className="text-primary">Terms and Conditions</span>
        </p>
      </div>
    </footer>
  );
}

export { Footer };
