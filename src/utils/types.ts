export type PartialGuild = {
    id: string,
    name: string,
    icon: null | string,
    owner:boolean,
    permissions: string,
    features: string[],
}