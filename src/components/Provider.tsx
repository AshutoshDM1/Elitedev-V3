import FontChanger, { FontInitializer } from "@/Shared/FontChanger/FontChanger";
import { ThemeProvider } from "./theme-provider";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {process.env.NODE_ENV === "development" && (
        <>
          <FontInitializer />
        </>
      )}
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
      {process.env.NODE_ENV === "development" && (
        <>
          <FontChanger />
        </>
      )}
    </>
  );
};

export default Provider;
