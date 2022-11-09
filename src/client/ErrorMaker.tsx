import Roact from "@rbxts/roact";
import RoactAnimate = require("rbx-roact-animate");

const Player = game.GetService("Players").LocalPlayer as Player;
const PlayerGui = Player.FindFirstChildOfClass("PlayerGui");

const TweenIn = new TweenInfo(0.12);
const TweenOut = new TweenInfo(0.7);

/*
Obsolete code from "rbx-roact-animate" example. To do

interface Prop {
  [Roact.Children]?: Roact.Element[]
}

interface States {
  t0: RoactAnimate.Value<number>,
  t1: RoactAnimate.Value<number>
}

export class ErrorMarker extends Roact.Component<Prop, States> {
  constructor(Props: Prop) {
    super(Props);

    this.setState({
      t0: new RoactAnimate.Value(1),
      t1: new RoactAnimate.Value(1)
    })
  }

  didMount() {
    spawn(() => {
      RoactAnimate.Sequence([
        // Prepare the Values themselves

        RoactAnimate.Parallel([
          RoactAnimate.Prepare(this.state.t0, 1),
          RoactAnimate.Prepare(this.state.t1, 1)
        ]),

        RoactAnimate.Parallel([
          RoactAnimate.Animate(this.state.t0, TweenIn, 0.6),
          RoactAnimate.Animate(this.state.t1, TweenIn, 0)
        ])
      ]).Start();
    });
  }

  render() {
    return (
       <frame
        BackgroundTransparency = { this.state.t0 as unknown as number }
        Position = { new UDim2(0, 0, 0, 0) }
        Size = { new UDim2(0, 0, 0, 0) }
        BackgroundColor3 = { Color3.fromRGB(255, 255, 255) }

        Key="Root"

        {...{[Roact.Children]: this.props[Roact.Children]}}
       >
          <textlabel Key="ErrorTxt"></textlabel>
       </frame>
    )
  };
}

const Marker = (
  <screengui>
    <ErrorMarker></ErrorMarker>
  </screengui>
);

*/

export function MakeNewMarker(Text: string, Duration: number) {
}