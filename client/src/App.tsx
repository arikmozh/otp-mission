import "./App.css";
import OtpForm from "./components/OtpForm";
export { default as Button } from "./components/Button";
export { default as EmailForm } from "./components/EmailForm";
export { default as InputField } from "./components/InputField";
export { default as OtpForm } from "./components/OtpForm";
export { default as OtpFormComponent } from "./components/OtpFormComponent";
export { default as Spinner } from "./components/Spinner";
export { default as Notification } from "./components/Notification";
function App() {
  return (
    <>
      <OtpForm />
    </>
  );
}

export default App;
