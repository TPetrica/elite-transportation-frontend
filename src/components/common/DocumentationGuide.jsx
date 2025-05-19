import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import OptimizedImage from '@/components/common/OptimizedImage'

const DocumentationGuide = () => {
  const [expandedSection, setExpandedSection] = useState(null)

  const sections = [
    {
      title: 'Getting Started',
      icon: '/assets/imgs/onepage-icon/smiles-icon.png',
      id: 'getting_started',
      items: [
        { title: 'Requirements', id: 'requirements' },
        { title: "What's Included", id: 'whats_included' },
      ],
    },
    {
      title: 'React Installation',
      icon: '/assets/imgs/react.png',
      id: 'React_installation',
    },
    {
      title: 'Basic Site Setting',
      icon: '/assets/imgs/side-nav/rc12.png',
      id: 'basic_site_setting',
      items: [
        { title: 'Change Site Title and Favicon', id: 'change_site_title_and_favicon' },
        { title: 'Change Logo', id: 'change_logo' },
      ],
    },
    {
      title: 'Template Options',
      icon: '/assets/imgs/side-nav/gear.png',
      id: 'template_options',
      items: [
        { title: 'Header', id: 'header' },
        { title: 'Hero Section', id: 'hero' },
        { title: 'Homepages', id: 'homepages' },
        { title: 'Service', id: 'service' },
        { title: 'Fleet', id: 'projects' },
        { title: 'Blog', id: 'blog' },
        { title: 'Contact', id: 'contact' },
        { title: 'Footer', id: 'copy-right' },
        { title: 'All Data', id: 'all-data' },
        { title: '404', id: 'error' },
      ],
    },
    {
      title: 'Change Log',
      icon: '/assets/imgs/side-nav/document2.png',
      id: 'change-log',
    },
  ]

  const toggleSection = sectionId => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId)
  }

  return (
    <aside className="doc_left_sidebarlist">
      <h3 className="nav_title">Documentation Guide</h3>
      <div className="scroll">
        <ul className="list-unstyled nav-sidebar" id="navbar-example3">
          {sections.map(section => (
            <li key={section.id} className="nav-item">
              <a href={`#${section.id}`} className="nav-link tw-flex tw-items-center tw-gap-2">
                {section.icon && (
                  <OptimizedImage 
                    src={section.icon} 
                    alt={section.title} 
                    width={20} 
                    height={20} 
                  />
                )}
                {section.title}
              </a>
              {section.items && (
                <>
                  <ul className={`list-unstyled dropdown_nav ${expandedSection === section.id ? 'tw-block' : 'tw-hidden'}`}>
                    {section.items.map(item => (
                      <li key={item.id} className="nav-item">
                        <a href={`#${item.id}`} className="nav-link">
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <span className="icon tw-cursor-pointer" onClick={() => toggleSection(section.id)}>
                    <i className={`icon_${expandedSection === section.id ? 'minus' : 'plus'}`}></i>
                  </span>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default DocumentationGuide