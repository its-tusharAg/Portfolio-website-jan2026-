# Tushar Agarwal - Video Editor Portfolio

A stunning, animated portfolio website built with React + Vite, featuring smooth animations, video previews, and a modern dark theme.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 📝 How to Customize Content

### 1. Profile Image (Contact Section)

**File:** `src/components/Contact.jsx`  
**Line:** ~131

```jsx
<AnimatedProfile
    imageSrc="YOUR_IMAGE_URL_HERE"
/>
```

**Options:**
- Use a URL: `"https://example.com/your-photo.jpg"`
- Use a local file: Place image in `src/assets/` and import:
  ```jsx
  import profileImg from '../assets/profile.jpg';
  // Then use: imageSrc={profileImg}
  ```

---

### 2. Hero Background Video

**File:** `src/components/Hero.jsx`  
**Line:** ~74-77

```jsx
<source
    src="YOUR_VIDEO_URL_HERE"
    type="video/mp4"
/>
```

**For local video:**
1. Place video in `public/videos/` folder
2. Reference as: `src="/videos/your-video.mp4"`

---

### 3. Project Videos & Thumbnails

**File:** `src/data/projects.js`

Each project has this structure:
```javascript
{
    id: '1',
    title: 'Brand Story',           // Project title
    category: 'Commercial',          // Category tag
    thumbnail: 'IMAGE_URL',          // Image shown by default
    videoUrl: 'VIDEO_URL',           // Video on hover
    description: 'Description text',
},
```

**To add your own project:**
```javascript
{
    id: '5',  // Unique ID
    title: 'My New Project',
    category: 'Music Video',
    thumbnail: 'https://your-image-url.jpg',
    videoUrl: 'https://your-video-url.mp4',
    description: 'Brief description of the project.',
},
```

**Using local files:**
1. Place in `public/` folder:
   - `public/thumbnails/project1.jpg`
   - `public/videos/project1.mp4`
2. Reference as:
   ```javascript
   thumbnail: '/thumbnails/project1.jpg',
   videoUrl: '/videos/project1.mp4',
   ```

---

### 4. Personal Information

#### Name
Multiple locations - search for "Tushar Agarwal":

| File | Location | Content |
|------|----------|---------|
| `src/components/Hero.jsx` | Line ~206 | Name tag at hero |
| `src/components/About.jsx` | Line ~148 | "I'm **Tushar Agarwal**" |
| `src/components/Contact.jsx` | Line ~150 | Profile section name |
| `src/components/Contact.jsx` | Line ~371 | Footer copyright |
| `index.html` | Line ~5 | Page title |

#### Contact Info
**File:** `src/components/Contact.jsx`  
**Lines:** ~10-13

```javascript
const contactInfo = {
    phone: '+91 7452981312',      // Your phone
    email: 'your@email.com',      // Your email
};
```

#### Social Links
**File:** `src/components/Contact.jsx`  
**Lines:** ~47-51

```javascript
const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/yourhandle', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/yourhandle', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/in/yourprofile', label: 'LinkedIn' },
];
```

---

### 5. About Section Content

**File:** `src/components/About.jsx`

| What | Line | How to change |
|------|------|---------------|
| Subtitle | ~137 | "Passionate about transforming..." |
| Bio text | ~148-165 | Two paragraphs of about text |
| Stats | ~58-77 | Projects, Experience, Clients, Views |
| Expertise tags | ~79-86 | Skills list array |

**Stats Example:**
```javascript
const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '5+', label: 'Years Experience' },
    { number: '30+', label: 'Happy Clients' },
    { number: '10M+', label: 'Views Generated' },
];
```

---

### 6. Theme Colors

**File:** `src/index.css`

Main gradient colors used throughout:
```css
/* Purple gradient */
#a855f7  /* Primary purple */
#9333ea  /* Darker purple */

/* Cyan accent */
#22d3ee  /* Cyan/teal */

/* Background */
#0a0a0a  /* Dark background */
```

To change the theme, search and replace these color codes.

---

## 📁 Project Structure

```
tushar-portfolio/
├── public/                  # Static files (put your videos/images here)
│   ├── videos/             # Your video files
│   └── thumbnails/         # Your thumbnail images
├── src/
│   ├── assets/             # Imported assets
│   ├── components/         # React components
│   │   ├── Hero.jsx        # Hero section + bg video
│   │   ├── ProjectGrid.jsx # Project cards with video
│   │   ├── About.jsx       # About section
│   │   ├── Contact.jsx     # Contact + profile image
│   │   └── AnimatedProfile.jsx  # Profile image component
│   ├── data/
│   │   └── projects.js     # All project data
│   ├── index.css           # Global styles + theme
│   └── App.jsx             # Main app component
└── index.html              # HTML template + page title
```

---

## 🎥 Recommended Video Specs

- **Format:** MP4 (H.264 codec)
- **Resolution:** 1920x1080 or 1280x720
- **File size:** Keep under 10MB for thumbnails, 50MB for hero
- **Aspect ratio:** 16:9 for consistency

**Free video hosting options:**
- [Cloudinary](https://cloudinary.com) - Free tier available
- [Bunny.net](https://bunny.net) - Fast CDN
- Put in `public/` folder for self-hosting

---

## 🖼️ Adding New Images

1. **For portfolio projects:** Use any public image URL
2. **For local images:** Place in `src/assets/` or `public/`
3. **Recommended:** Use [Pexels](https://pexels.com) or [Unsplash](https://unsplash.com) for free stock

---

## 🛠️ Common Customizations

### Change page title
**File:** `index.html`
```html
<title>Your Name | Your Title</title>
```

### Add/remove a project
**File:** `src/data/projects.js` - Add or remove objects from the array

### Change availability status
**File:** `src/components/Contact.jsx` - Line ~168
Change "Available for projects" to your status

---

## 📱 Deployment

```bash
# Build the project
npm run build

# The `dist` folder is ready to deploy to:
# - Vercel
# - Netlify
# - GitHub Pages
# - Any static hosting
```

---

## Need Help?

The main files you'll edit 90% of the time:
1. `src/data/projects.js` - Your projects
2. `src/components/Contact.jsx` - Your info & profile
3. `src/components/Hero.jsx` - Hero video
4. `src/components/About.jsx` - Your bio
