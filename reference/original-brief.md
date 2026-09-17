# Original brief (Morshed's instructions, verbatim)

Kept as the design brief for this project since the full grill-me/design-brief process was
skipped by explicit request on 2026-09-15.

---

Udvash-Unmesh Online Care App

https://udvash-unmesh.com/HomePage

Website → App Conversion Task
আমি একটি existing website-কে React + Next.js ব্যবহার করে একটি modern responsive application/web-app এ convert করতে চাই।
আমি তোমাকে একটি PDF design draft / visual reference দিচ্ছি। এই PDF-টাই হবে application's primary UI/UX design source of truth।

## 1. Core Requirement
Existing website-এর: Content, Text, Images, Course/data information, Categories, Relevant existing functionality — প্রয়োজন অনুযায়ী ব্যবহার করতে পারবে।
কিন্তু UI/UX design, layout, spacing, visual hierarchy এবং interaction PDF draft অনুযায়ী তৈরি করতে হবে।
অর্থাৎ: Content → Existing Website থেকে, Design/UI → PDF Draft থেকে।
PDF-এর design-কে নিজের মতো redesign বা reinterpret করবে না।

## 2. PDF Design Must Be Followed Closely
Layout structure, section positioning, header/navigation, card design, typography hierarchy, font sizing, spacing, padding, border radius, buttons, icons, images, colors, background, shadows, borders, tabs, filters, bottom navigation, mobile navigation, content hierarchy, component proportions — সব PDF অনুযায়ী।

## 3. Website Content Integration
Existing website analyse করে প্রয়োজনীয় content/data ব্যবহার করো (real content, image/assets, text, categories/data structure)। Website শুধু content/data reference; website-এর existing UI copy করবে না।

## 4. Technology
React, Next.js, TypeScript, Tailwind CSS if appropriate, reusable components, responsive design, production-ready structure।

## 5. Important Design Rule
DO NOT: নতুন UI design করা, PDF layout পরিবর্তন করা, unnecessary components/animations যোগ করা, website UI blindly copy করা, desktop shrink করে mobile বানানো।
DO: PDF accurately reproduce করা, spacing/hierarchy maintain করা, appropriate content নেওয়া, responsive behaviour intelligently implement করা, reusable components, PDF-intended mobile experience।

## 6. Responsive Behaviour
Mobile-focused draft হলে structure/interaction priority maintain করবে; desktop/tablet adaptation প্রয়োজনে করবে কিন্তু visual language পরিবর্তন করবে না। Breakpoints, card width, grid/stack, typography scaling, spacing, navigation, touch target, horizontal scroll, bottom nav — সব carefully handle করবে।

## 7. Assets
প্রথমে existing assets (project + website) inspect করো; PDF-এর matching image/icon/logo থাকলে সেটাই ব্যবহার করো; নিজে থেকে placeholder ব্যবহারের আগে existing asset খুঁজে দেখো।

## 8. UX & Interaction
PDF static visual দেখে প্রয়োজনীয় interaction identify করো (tabs, dropdown, search, filter, card interaction, navigation, modal, bottom sheet, accordion, carousel, back navigation, form interaction) এবং functional করে implement করো। PDF-এ visual indication না থাকলে unnecessary interaction invent করবে না।

## 9-13. Process, component architecture, content-vs-design priority, visual accuracy, no over-engineering

Screen/component mapping করে প্রতিটি screen-এর reusable components identify করে implementation শুরু করা। Reusable components (Header, BottomNavigation, CourseCard, CategoryCard, SearchBar, Filter, Tabs, Button, Modal, SectionHeader, ...), duplicate UI avoid করা। Conflict হলে: design conflict → PDF wins; content conflict → website wins। Implementation শেষে প্রতিটি screen PDF-এর সাথে visually compare করে mismatch refine করা। Over-engineering, excessive animation, unnecessary dependencies avoid করা। Priority: Accurate UI + Functional UX + Responsive behaviour + Clean code।

## Rough wireframe sketch (from the message, textual)

Splash → Hero banner ("ভর্তি চলছে / নতুন কোর্স", বিস্তারিত দেখুন CTA) → Explore Programs section
(Trial/Free Course card, প্রোগ্রামসমূহ card) → More Services (Online Admission, Notice) →
bottom nav: Branches / Home / Login.
