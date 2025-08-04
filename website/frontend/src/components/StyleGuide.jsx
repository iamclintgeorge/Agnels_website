import React from "react";

// Style Guide Component
const StyleGuide = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-12 heading-premium">
          FCRIT Website Style Guide
        </h1>

        {/* Typography Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 heading-premium">Typography</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Primary Font */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-primary">Primary Font: Inter</h3>
              <div className="space-y-4">
                <p className="text-3xl font-bold">Heading Bold</p>
                <p className="text-2xl font-semibold">Heading Semibold</p>
                <p className="text-xl font-medium">Heading Medium</p>
                <p className="text-lg">Regular text</p>
                <p className="text-base">Body text</p>
                <p className="text-sm">Small text</p>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                <strong>Usage:</strong> Primary font for all body text, navigation, buttons, and general content.
              </p>
            </div>

            {/* Premium Font */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-primary">Premium Font: Playfair Display</h3>
              <div className="space-y-4">
                <p className="text-3xl font-bold heading-premium">Premium Heading Bold</p>
                <p className="text-2xl font-semibold heading-premium">Premium Heading Semibold</p>
                <p className="text-xl font-medium heading-premium">Premium Heading Medium</p>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                <strong>Usage:</strong> Special occasions only - major page titles, section headers, premium content.
                <br />
                <strong>Class:</strong> <code>heading-premium</code>
              </p>
            </div>
          </div>
        </section>

        {/* Color Palette */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 heading-premium">Color Palette</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Primary Color */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-full h-20 bg-primary rounded-lg mb-4"></div>
              <h3 className="text-lg font-semibold mb-2">Primary Color</h3>
              <p className="text-sm text-gray-600 mb-2">#0c2340</p>
              <p className="text-sm">
                <strong>Usage:</strong> Buttons, links, headings, and primary brand elements.
              </p>
            </div>

            {/* Accent Color */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-full h-20 bg-accent rounded-lg mb-4"></div>
              <h3 className="text-lg font-semibold mb-2">Accent Color</h3>
              <p className="text-sm text-gray-600 mb-2">#AE9142</p>
              <p className="text-sm">
                <strong>Usage:</strong> Sparingly - special highlights, decorative elements only when necessary.
              </p>
            </div>

            {/* Neutral Colors */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="space-y-2 mb-4">
                <div className="w-full h-4 bg-gray-900 rounded"></div>
                <div className="w-full h-4 bg-gray-700 rounded"></div>
                <div className="w-full h-4 bg-gray-500 rounded"></div>
                <div className="w-full h-4 bg-gray-300 rounded"></div>
                <div className="w-full h-4 bg-gray-100 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Neutral Grays</h3>
              <p className="text-sm">
                <strong>Usage:</strong> Body text, backgrounds, borders, and supporting elements.
              </p>
            </div>
          </div>
        </section>

        {/* Button Styles */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 heading-premium">Button Styles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Primary Button */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Primary Button</h3>
              <button className="btn-primary mb-4">Primary Button</button>
              <p className="text-sm text-gray-600">
                <strong>Class:</strong> <code>btn-primary</code><br />
                <strong>Usage:</strong> Main actions, form submissions, primary CTAs.
              </p>
            </div>

            {/* Accent Button */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Accent Button</h3>
              <button className="btn-accent mb-4">Accent Button</button>
              <p className="text-sm text-gray-600">
                <strong>Class:</strong> <code>btn-accent</code><br />
                <strong>Usage:</strong> Very rarely - only for special emphasis when needed.
              </p>
            </div>

            {/* Outline Button */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Outline Button</h3>
              <button className="btn-outline mb-4">Outline Button</button>
              <p className="text-sm text-gray-600">
                <strong>Class:</strong> <code>btn-outline</code><br />
                <strong>Usage:</strong> Secondary actions, cancel buttons.
              </p>
            </div>
          </div>
        </section>

        {/* Text Utilities */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 heading-premium">Text Utilities</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-4">
              <p className="text-primary">Primary text color (.text-primary)</p>
              <p className="text-accent">Accent text color (.text-accent)</p>
              <p className="heading-premium">Premium heading font (.heading-premium)</p>
            </div>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 heading-premium">Usage Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-green-600">✅ Do</h3>
              <ul className="space-y-2 text-sm">
                <li>• Use Inter for all body text and general content</li>
                <li>• Use Playfair Display sparingly for special headings</li>
                <li>• Use primary color (#0c2340) for all buttons</li>
                <li>• Apply <code>btn-primary</code> class for main actions</li>
                <li>• Use <code>heading-premium</code> for section titles</li>
                <li>• Maintain consistent spacing and sizing</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-red-600">❌ Don't</h3>
              <ul className="space-y-2 text-sm">
                <li>• Don't use multiple fonts in one section</li>
                <li>• Don't overuse the accent color (#AE9142)</li>
                <li>• Don't use random button colors</li>
                <li>• Don't mix font weights inconsistently</li>
                <li>• Don't ignore the established color hierarchy</li>
                <li>• Don't use Playfair Display for body text</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Implementation */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 heading-premium">Implementation</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="mb-4">
              The global styles are automatically applied through <code>global.css</code> and 
              <code>tailwind.config.js</code>. All elements will use Inter font by default.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Key Classes:</h4>
              <ul className="text-sm space-y-1">
                <li><code>.btn-primary</code> - Primary button styling</li>
                <li><code>.btn-accent</code> - Accent button (use sparingly)</li>
                <li><code>.btn-outline</code> - Outline button</li>
                <li><code>.heading-premium</code> - Playfair Display font for special headings</li>
                <li><code>.text-primary</code> - Primary text color</li>
                <li><code>.text-accent</code> - Accent text color</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StyleGuide;