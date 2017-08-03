module Hello exposing (..)

import VirtualDom exposing (Node, parent, leaf, property, yogaProperty, program)
import Json.Encode


main : Program Never Model msg
main =
    program
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }



-- MODEL


type alias Model =
    ()


init : ( Model, Cmd msg )
init =
    ( (), Cmd.none )



-- UPDATE


update : msg -> Model -> ( Model, Cmd msg )
update msg model =
    init



-- VIEW


view : Model -> Node msg
view model =
    parent "view"
        [ yogaProperty "flexDirection" (Json.Encode.string "column")
        , yogaProperty "flexGrow" (Json.Encode.int 1)
        , yogaProperty "justifyContent" (Json.Encode.string "center")
        , yogaProperty "alignItems" (Json.Encode.string "center")
        , property "backgroundColor" (Json.Encode.string "yellow")
        ]
        [ leaf "label"
            [ property "text" (Json.Encode.string "Hello from Elm!")
            , property "textColor" (Json.Encode.string "red")
            ]
        ]



-- SUBSCRIPTIONS


subscriptions : Model -> Sub msg
subscriptions model =
    Sub.none
