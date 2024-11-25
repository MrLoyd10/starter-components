import { Autocomplete as AutocompleteOne } from "@/components/form/autocomplete/example-one";
import { Autocomplete as AutocompleteTwo } from "@/components/form/autocomplete/example-two";

const App = () => (
  <>
    <div className="space-y-4 mx-auto px-8 py-16 md:py-32 w-full max-w-md">
      <div className="space-y-1.5">
        <h1 className="font-bold text-3xl tracking-tight">
          Shadcn/ui Combobox | Example One
        </h1>
        <p className="text-muted-foreground text-sm">
          Autocomplete input and command palette with a list of suggestions.
        </p>
      </div>

      <AutocompleteOne />
    </div>

    <div className="space-y-4 mx-auto mt-56 px-8 py-16 md:py-32 w-full max-w-md">
      <div className="space-y-1.5">
        <h1 className="font-bold text-3xl tracking-tight">
          Shadcn/ui Combobox | Example Two
        </h1>
        <p className="text-muted-foreground text-sm">
          Autocomplete input and command palette with a list of suggestions.
        </p>
      </div>

      <AutocompleteTwo />
    </div>

    <div className="w-full h-[200px]" />
  </>
);

export default App;
