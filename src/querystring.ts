import queryString from "query-string";

export function getQueryString() {
    return queryString.parse(location.search, {
        parseNumbers: true,
        arrayFormat: "bracket-separator",
        arrayFormatSeparator: ",",
    });
}

export function setQueryString(obj: any) {
    history.replaceState(
        null,
        null,
        "?" +
        queryString.stringify(
            obj,
            {
                arrayFormat: "bracket-separator",
                arrayFormatSeparator: ",",
            }
        )
    );
}