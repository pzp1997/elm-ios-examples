module Main exposing (..)

import VirtualDom.Element
    exposing
        ( Element
        , Attribute
        , column
        , row
        , button
        , label
        , map
        , beginnerProgram
        )
import VirtualDom.Attributes
    exposing
        ( text
        , textColor
        , flexGrow
        , justifyContent
        , alignItems
        , marginHorizontal
        , marginBottom
        )
import VirtualDom.Events exposing (onTouchUpInside)
import VirtualDom.Lazy exposing (lazy)
import Color exposing (Color)


main : Program Never Model Msg
main =
    beginnerProgram
        { model = 0
        , view = lazy view
        , update = update
        }



-- MODEL


type alias Model =
    Int



-- UPDATE


type Msg
    = Increment
    | Decrement


update : Msg -> Model -> Model
update msg model =
    case msg of
        Increment ->
            model + 1

        Decrement ->
            model - 1



-- VIEW


view : Model -> Element Msg
view model =
    mapIfOdd model <|
        column [ flexGrow 1, justifyContent "center", alignItems "center" ]
            [ label <| maybeCons (labelColor model) [ text <| toString model, marginBottom 25 ]
            , row []
                [ lazy
                    (\_ ->
                        button
                            [ text "Increment"
                            , textColor Color.green
                            , onTouchUpInside Increment
                            , marginHorizontal 20
                            ]
                    )
                    model
                , map (always Decrement) <|
                    button
                        [ text "Decrement"
                        , textColor Color.red
                        , onTouchUpInside "foo"
                        , marginHorizontal 20
                        ]
                ]
            ]


labelColor : Model -> Maybe (Attribute msg)
labelColor model =
    if model >= 10 then
        Just <| textColor Color.green
    else if model <= -10 then
        Just <| textColor Color.red
    else
        Nothing


maybeCons : Maybe a -> List a -> List a
maybeCons maybe list =
    case maybe of
        Just x ->
            x :: list

        Nothing ->
            list


mapIfOdd : Model -> (Element msg -> Element msg)
mapIfOdd model =
    if model % 2 == 1 then
        map identity
    else
        identity
