import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { exportAsImage, copyToClipboard } from '@/lib/utils/export';
import EditorLayout from '@/components/layout/EditorLayout';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs, dracula, atomDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeTheme {
  id: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style: any; // Type for syntax highlighter style
  isDark: boolean;
}

const CODE_THEMES: CodeTheme[] = [
  { id: 'vscDarkPlus', name: 'VS Code Dark+', style: vscDarkPlus, isDark: true },
  { id: 'vs', name: 'VS Code Light', style: vs, isDark: false },
  { id: 'atomDark', name: 'Atom Dark', style: atomDark, isDark: true },
  { id: 'dracula', name: 'Dracula', style: dracula, isDark: true },
  { id: 'materialLight', name: 'Material Light', style: materialLight, isDark: false },
];

const LANGUAGES = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'csharp', name: 'C#' },
  { id: 'cpp', name: 'C++' },
  { id: 'go', name: 'Go' },
  { id: 'rust', name: 'Rust' },
  { id: 'ruby', name: 'Ruby' },
  { id: 'php', name: 'PHP' },
  { id: 'html', name: 'HTML' },
  { id: 'css', name: 'CSS' },
  { id: 'sql', name: 'SQL' },
  { id: 'bash', name: 'Bash' },
  { id: 'json', name: 'JSON' },
  { id: 'yaml', name: 'YAML' },
];

const DEFAULT_CODE = `function greeting(name) {
  return 'Hello, ' + name + '!';
}

// Call the function
const message = greeting('World');
console.log(message);`;

const CodeEditor = () => {
  // State for code and settings
  const [code, setCode] = useState(DEFAULT_CODE);
  const [language, setLanguage] = useState('javascript');
  const [themeId, setThemeId] = useState('vscDarkPlus');
  const [padding, setPadding] = useState(32);
  const [borderRadius, setBorderRadius] = useState(12);
  const [fontSize, setFontSize] = useState(14);
  const [showLineNumbers, setShowLineNumbers] = useState(true);

  // Refs
  const exportRef = useRef<HTMLDivElement>(null);

  // Get current theme
  const theme = CODE_THEMES.find(t => t.id === themeId) || CODE_THEMES[0];

  // Export functions
  const handleExport = () => {
    if (exportRef.current) {
      exportAsImage(exportRef.current, `code-${language}.png`);
    }
  };

  const handleCopy = () => {
    if (exportRef.current) {
      copyToClipboard(exportRef.current)
        .then((success) => {
          if (success) {
            alert('Image copied to clipboard!');
          } else {
            alert('Failed to copy image. Please try downloading instead.');
          }
        });
    }
  };

  const syntaxHighlight = (code: string): React.ReactNode => {
    try {
      return (
        <SyntaxHighlighter
          language={language}
          style={theme.style}
          showLineNumbers={showLineNumbers}
          wrapLongLines={true}
          customStyle={{
            margin: 0,
            borderRadius: `${borderRadius}px`,
          }}
        >
          {code}
        </SyntaxHighlighter>
      );
    } catch (error) {
      console.error('Syntax highlighting error:', error);
      return <code>{code}</code>;
    }
  };

  // Canvas component
  const Canvas = () => (
    <div 
      ref={exportRef}
      className="rounded-lg overflow-hidden"
      style={{
        padding: `${padding}px`,
        backgroundColor: theme.isDark ? '#1e1e1e' : '#f5f5f5',
        maxWidth: '100%',
      }}
    >
      <div 
        style={{ 
          borderRadius: `${borderRadius}px`,
          overflow: 'hidden',
          fontSize: `${fontSize}px`,
        }}
      >
        {syntaxHighlight(code)}
      </div>
    </div>
  );

  // Controls component
  const Controls = () => (
    <>
      <Card className="p-4">
        <h3 className="text-lg font-medium mb-2">Code</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm block mb-1">Code Content</label>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="font-mono text-sm h-40"
              placeholder="Enter your code here..."
            />
          </div>

          <div>
            <label className="text-sm block mb-1">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-transparent border rounded-md p-2"
            >
              {LANGUAGES.map(lang => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-medium mb-2">Theme</h3>
        <div className="grid grid-cols-1 gap-2 mb-4">
          {CODE_THEMES.map((themeOption) => (
            <div
              key={themeOption.id}
              className={`p-2 border rounded-md cursor-pointer ${
                themeId === themeOption.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
              onClick={() => setThemeId(themeOption.id)}
            >
              <div className="text-sm font-medium">{themeOption.name}</div>
              <div 
                className="mt-1 rounded overflow-hidden h-6"
                style={{ backgroundColor: themeOption.isDark ? '#1e1e1e' : '#f5f5f5' }}
              >
                <div 
                  className="h-full rounded-l"
                  style={{ 
                    width: '30%', 
                    backgroundColor: themeOption.isDark ? '#569cd6' : '#0000ff',
                    display: 'inline-block'
                  }}
                />
                <div 
                  className="h-full rounded-l"
                  style={{ 
                    width: '30%', 
                    backgroundColor: themeOption.isDark ? '#4ec9b0' : '#267f99',
                    display: 'inline-block'
                  }}
                />
                <div 
                  className="h-full rounded-l"
                  style={{ 
                    width: '40%', 
                    backgroundColor: themeOption.isDark ? '#ce9178' : '#a31515',
                    display: 'inline-block'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-medium mb-2">Appearance</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm">Padding</label>
              <span className="text-sm">{padding}px</span>
            </div>
            <Slider 
              value={[padding]} 
              min={8} 
              max={64} 
              step={4}
              onValueChange={(value) => setPadding(value[0])} 
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm">Border Radius</label>
              <span className="text-sm">{borderRadius}px</span>
            </div>
            <Slider 
              value={[borderRadius]} 
              min={0} 
              max={24} 
              step={2}
              onValueChange={(value) => setBorderRadius(value[0])} 
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm">Font Size</label>
              <span className="text-sm">{fontSize}px</span>
            </div>
            <Slider 
              value={[fontSize]} 
              min={10} 
              max={24} 
              step={1}
              onValueChange={(value) => setFontSize(value[0])} 
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm">Line Numbers</label>
            <Switch
              checked={showLineNumbers}
              onCheckedChange={setShowLineNumbers}
            />
          </div>
        </div>
      </Card>
    </>
  );

  return (
    <EditorLayout
      onExport={handleExport}
      onCopy={handleCopy}
      ControlPanel={<Controls />}
    >
      <Canvas />
    </EditorLayout>
  );
};

export default CodeEditor;
