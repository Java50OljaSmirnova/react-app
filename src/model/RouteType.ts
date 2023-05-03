export type RouteType = {
    path: string,
    label: string
    authenticated?: boolean, /*show only in authenticated state (either as USER or ADMIN) */
    always?: boolean, /*8.1.4.show always in any authenticated state*/
    admin?: boolean, /*show only in authenticated state as ADMIN */
    no_authenticated?: boolean /*show only in no authenticated state*/
    client?: boolean /*only for a client, not admin*/
}