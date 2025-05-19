import DefaultLayout from '@/layouts/DefaultLayout'
import DocumentationGuide from '@/components/common/DocumentationGuide'

const metadata = {
  title: 'Documentation | Elite Transportation Park City Development Guide',
  description: 'Complete development documentation for the Elite Transportation Park City web application. Learn about setup, installation, and customization.',
  robots: 'noindex, follow',
}

export default function DocumentationPage() {
  return (
    <DefaultLayout metadata={metadata}>
      <div className="doc full-width-doc sticky-nav-doc onepage-doc container tw-py-12">
        <div className="row">
          <div className="col-lg-4 col-md-4">
            <DocumentationGuide />
          </div>
          <div className="col-lg-8 col-md-8">
            <div className="documentation_info" id="post">
              <article className="pt-0 documentation_body doc-section" id="getting_started">
                <div className="shortcode_title">
                  <h1>Getting Started</h1>
                  <p>
                    Welcome to <strong>Elite Transportation Park City</strong> ReactJS Template.
                    We would like to thank you for choosing our template.
                  </p>
                  <p>
                    It's built with the most modern tools <strong>ReactJS + Vite + Bootstrap 5</strong>. 
                    It's a high-quality and well-organized ReactJS template specially designed to fit all the needs of a 
                    luxury transportation business.
                  </p>
                </div>
                
                <div className="shortcode_title" id="requirements">
                  <h2>Requirements</h2>
                  <p>
                    There are system requirements in order to install and setup this template and its components properly. 
                    Make sure that you already have <strong>Node.js</strong> and <strong>npm</strong> installed on your PC.
                  </p>
                  <ul>
                    <li>Node.js version 16.x or higher</li>
                    <li>npm version 7.x or higher</li>
                    <li>MongoDB database</li>
                    <li>Modern web browser</li>
                  </ul>
                </div>

                <div className="shortcode_title" id="whats_included">
                  <h2>What's Included</h2>
                  <p>
                    After downloading the Elite Transportation template, you will find the following folders and files:
                  </p>
                  <ul>
                    <li><strong>luxride/</strong> - Frontend React application</li>
                    <li><strong>backend/</strong> - Node.js/Express REST API</li>
                    <li><strong>documentation/</strong> - This documentation guide</li>
                    <li><strong>email-templates/</strong> - Email template designs</li>
                  </ul>
                </div>
              </article>

              <article className="documentation_body doc-section" id="React_installation">
                <div className="shortcode_title">
                  <h2>React Installation</h2>
                  <p>Follow these steps to install and run the React frontend:</p>
                </div>
                <div className="steps-panel">
                  <ol className="ordered-list">
                    <li>
                      <strong>Navigate to the frontend directory:</strong>
                      <pre className="language-bash"><code>cd luxride</code></pre>
                    </li>
                    <li>
                      <strong>Install dependencies:</strong>
                      <pre className="language-bash"><code>npm install</code></pre>
                    </li>
                    <li>
                      <strong>Start the development server:</strong>
                      <pre className="language-bash"><code>npm run dev</code></pre>
                      <p>The application will be available at http://localhost:5173</p>
                    </li>
                    <li>
                      <strong>Build for production:</strong>
                      <pre className="language-bash"><code>npm run build</code></pre>
                    </li>
                  </ol>
                </div>
              </article>

              <article className="documentation_body doc-section" id="basic_site_setting">
                <div className="shortcode_title">
                  <h2>Basic Site Settings</h2>
                </div>
                
                <div id="change_site_title_and_favicon">
                  <h3>Change Site Title and Favicon</h3>
                  <p>To change the site title and favicon:</p>
                  <ol>
                    <li>Update the meta tags in your page components</li>
                    <li>Replace the favicon file in the public directory</li>
                    <li>Update the title in index.html</li>
                  </ol>
                </div>

                <div id="change_logo">
                  <h3>Change Logo</h3>
                  <p>To update the site logo:</p>
                  <ol>
                    <li>Replace logo files in /public/assets/imgs/template/</li>
                    <li>Update references in Header components</li>
                    <li>Optimize images for web performance</li>
                  </ol>
                </div>
              </article>

              <article className="documentation_body doc-section" id="template_options">
                <div className="shortcode_title">
                  <h2>Template Options</h2>
                </div>

                <div id="header">
                  <h3>Header Configuration</h3>
                  <p>The header component can be customized by:</p>
                  <ul>
                    <li>Modifying /src/components/headers/Header1.jsx</li>
                    <li>Updating navigation items in /src/data/menu.js</li>
                    <li>Changing styles in the SCSS files</li>
                  </ul>
                </div>

                <div id="homepages">
                  <h3>Homepage Variations</h3>
                  <p>The template includes multiple homepage variations:</p>
                  <ul>
                    <li>Default homepage with hero banner</li>
                    <li>Service-focused layout</li>
                    <li>Fleet showcase layout</li>
                  </ul>
                </div>

                <div id="service">
                  <h3>Service Pages</h3>
                  <p>Service pages are configured through:</p>
                  <ul>
                    <li>Service data in /src/data/services.js</li>
                    <li>Service components in /src/components/service/</li>
                    <li>Backend service management</li>
                  </ul>
                </div>

                <div id="blog">
                  <h3>Blog System</h3>
                  <p>The blog system includes:</p>
                  <ul>
                    <li>Blog list and grid layouts</li>
                    <li>Individual blog post pages</li>
                    <li>Rich text editor for content creation</li>
                    <li>Category and tag management</li>
                  </ul>
                </div>
              </article>

              <article className="documentation_body doc-section" id="change-log">
                <div className="shortcode_title">
                  <h2>Change Log</h2>
                </div>
                <div className="version_log">
                  <h4>Version 1.0.0 - Initial Release</h4>
                  <ul>
                    <li>Initial template release</li>
                    <li>Complete booking system</li>
                    <li>Admin dashboard</li>
                    <li>Blog management</li>
                    <li>Fleet and service management</li>
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}