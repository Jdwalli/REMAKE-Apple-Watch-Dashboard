export interface ViewProps {
    center:  [number, number]
    zoom: number
}

export interface MapProps {
    lat: number[]
    long: number[]
    center:  [number, number]
    zoom: number
    disabled?: boolean

}