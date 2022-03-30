interface ImageOption {
    exts: string[]
}

declare module '@ioc:Adonis/Core/Validator' {
    interface Rules {
        image(args: ImageOption): Rule
    }
}