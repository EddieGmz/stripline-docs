import { Crumb, GuidePager, Step, Steps } from "~/components/docs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import type { Route } from "./+types/installation";

export const meta: Route.MetaFunction = () => [{ title: "Installation · Stripline" }];

export default function Installation() {
  return (
    <>
      <Crumb />
      <h1>Installation</h1>
      <p className="lede">Two downloads: the bridge plugin and the console app, for your system.</p>
      <Tabs defaultValue="mac">
        <TabsList>
          <TabsTrigger value="mac">macOS</TabsTrigger>
          <TabsTrigger value="win">Windows</TabsTrigger>
          <TabsTrigger value="linux">Linux</TabsTrigger>
        </TabsList>
        <TabsContent value="mac">
          <Steps>
            <Step title="Install the bridge">
              Unzip <code>stripline-bridge-macOS.zip</code> and copy <code>Stripline.vst3</code> to{" "}
              <code>~/Library/Audio/Plug-Ins/VST3</code>.
            </Step>
            <Step title="Allow it to run">
              Builds aren't signed yet. Run this once in Terminal:
              <pre>
                <code>xattr -dr com.apple.quarantine ~/Library/Audio/Plug-Ins/VST3/Stripline.vst3</code>
              </pre>
            </Step>
            <Step title="Install the console">
              Open <code>Stripline_x.y.z_aarch64.dmg</code> and drag Stripline to Applications. The first time,
              right-click the app and choose <i>Open</i>.
            </Step>
          </Steps>
        </TabsContent>
        <TabsContent value="win">
          <Steps>
            <Step title="Install the bridge">
              Unzip <code>stripline-bridge-Windows.zip</code> and copy <code>Stripline.vst3</code> to{" "}
              <code>C:\Program Files\Common Files\VST3</code>.
            </Step>
            <Step title="Install the console">
              Run <code>Stripline_x.y.z_x64-setup.exe</code> (or the <code>.msi</code>). Windows SmartScreen may warn
              about an unknown publisher: <i>More info → Run anyway</i>.
            </Step>
          </Steps>
        </TabsContent>
        <TabsContent value="linux">
          <Steps>
            <Step title="Install the bridge">
              Unzip <code>stripline-bridge-Linux.zip</code> and copy <code>Stripline.vst3</code> to <code>~/.vst3</code>.
            </Step>
            <Step title="Install the console">
              Use the <code>.deb</code>, or make the <code>.AppImage</code> executable and run it:
              <pre>
                <code>{"chmod +x Stripline_x.y.z_amd64.AppImage\n./Stripline_x.y.z_amd64.AppImage"}</code>
              </pre>
            </Step>
          </Steps>
        </TabsContent>
      </Tabs>
      <h2>Requirements</h2>
      <ul>
        <li>REAPER 6 or later. Other VST3 hosts work too, without track order, mute/solo and transport.</li>
        <li>At least one supported channel strip, installed as VST3.</li>
      </ul>
      <GuidePager at="/installation" />
    </>
  );
}
