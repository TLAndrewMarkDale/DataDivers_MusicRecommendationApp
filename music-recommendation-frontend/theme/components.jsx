import { mode } from "@chakra-ui/theme-tools";

export const components = {
    components : {
        searchBarInputBox : {
            bg: mode("#F5F5F5", "#212121")(props),
            border: "1px",
            borderColor: mode("#E0E0E0", "#646464")(props)
        }
    }
}