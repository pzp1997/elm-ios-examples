module Main exposing (..)

import VirtualDom exposing (Node, Property, program)
import Json.Encode as Json
import Time exposing (Time, second)


main : Program Never Model Msg
main =
    program
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }



-- Model


type alias Model =
    Int


init : ( Model, Cmd msg )
init =
    ( 0, Cmd.none )



-- UPDATE


type Msg
    = Tick Time


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Tick _ ->
            ( model + 1, Cmd.none )



-- VIEW


view : Model -> Node Msg
view model =
    column
        [ flexGrow 1
        , justifyContent "center"
        , alignItems "center"
        ]
        [ label
            [ text (toString model)
            ]
        ]



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Time.every second Tick



-- UIKit Definitions


label : List (Property msg) -> Node msg
label properties =
    VirtualDom.leaf "label" properties


column : List (Property msg) -> List (Node msg) -> Node msg
column properties children =
    VirtualDom.parent "view" (flexDirection "column" :: properties) children


stringProperty : String -> String -> Property msg
stringProperty name string =
    VirtualDom.property name (Json.string string)


stringYogaProperty : String -> String -> Property msg
stringYogaProperty name string =
    VirtualDom.yogaProperty name (Json.string string)


intYogaProperty : String -> Int -> Property msg
intYogaProperty name int =
    VirtualDom.yogaProperty name (Json.int int)


text : String -> Property msg
text value =
    stringProperty "text" value


flexDirection : String -> Property msg
flexDirection value =
    stringYogaProperty "flexDirection" value


flexGrow : Int -> Property msg
flexGrow value =
    intYogaProperty "flexGrow" value


justifyContent : String -> Property msg
justifyContent value =
    stringYogaProperty "justifyContent" value


alignItems : String -> Property msg
alignItems value =
    stringYogaProperty "alignItems" value
