module Main exposing (..)

import Json.Encode
import Task
import VirtualDom exposing (Node, leaf, parent, program, property, yogaProperty)


main : Program Never Model Msg
main =
    program
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }



-- MODEL


type alias Model =
    String


init : ( Model, Cmd Msg )
init =
    ( "", send Start )



-- UPDATE


send : msg -> Cmd msg
send msg =
    Task.succeed msg
        |> Task.perform identity


type Msg
    = Start


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Start ->
            ( "Hello", Cmd.none )



-- VIEW


view : Model -> Node msg
view model =
    parent "view"
        [ yogaProperty "flexDirection" (Json.Encode.string "column")
        , yogaProperty "flexGrow" (Json.Encode.int 1)
        , yogaProperty "justifyContent" (Json.Encode.string "center")
        , yogaProperty "alignItems" (Json.Encode.string "center")
        ]
        [ leaf "label"
            [ property "text" (Json.Encode.string model)
            ]
        ]



-- SUBSCRIPTIONS


subscriptions : Model -> Sub msg
subscriptions model =
    Sub.none
