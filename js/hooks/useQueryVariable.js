import { useLayoutEffect, useState } from "react";

export default function useQueryVariable(variable) {
    const [value, setValue] = useState(null);

    useLayoutEffect(() => {
        const query = new URLSearchParams(window.location.search);
        setValue(query.get(variable));
    }, [variable]);

    return value;
}
