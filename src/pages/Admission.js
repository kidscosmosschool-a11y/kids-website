import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import emailjs from '@emailjs/browser';
import SEO from '../components/SEO';
emailjs.init('FkPbkrgFMA6Je3_0J');

  
function Admission() {
  const [formData, setFormData] = useState({
    dob: '', gender: 'Male',
    child_fname: '', child_mname: '', child_lname: '',
    religion: '', language: '', address: '', preferred_name: '',
    admission_grade: 'Playgroup', transport: 'No', extended_care: 'No',
    start_time: '', end_time: '',
    p1_title: '', p1_fname: '', p1_mname: '', p1_lname: '',
    p1_relation: '', p1_responsibility: 'Yes',
    p1_home: '', p1_mobile: '', p1_email: '', p1_worktel: '', p1_workplace: '',
    p2_title: '', p2_fname: '', p2_mname: '', p2_lname: '',
    p2_relation: '', p2_responsibility: 'Yes',
    p2_home: '', p2_mobile: '', p2_email: '', p2_worktel: '', p2_workplace: '',
    other_children: '',
    schools: '', illness: '', immunization: '', allergies: '',
    special_needs: '', potty_trained: 'Yes', fears: '', milk: '',
    activities_pref: '', food: '', height: '', weight: '',
    pickup: '', parent_name: '', declaration_date: '',
  });

  const [submitted, setSubmitted]     = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading]         = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // KEY FIX: always show all fields, blank ones show as '—' so nothing is ever skipped
  const buildSections = (fd) => [
    {
      section: "CHILD'S DETAILS",
      fields: [
        ['First Name',            fd.child_fname     || '—'],
        ['Middle Name',           fd.child_mname     || '—'],
        ['Last Name',             fd.child_lname     || '—'],
        ['Date of Birth',         fd.dob             || '—'],
        ['Gender',                fd.gender],
        ['Religion / Culture',    fd.religion        || '—'],
        ['Language at Home',      fd.language        || '—'],
        ['Address',               fd.address         || '—'],
        ['Preferred Name',        fd.preferred_name  || '—'],
        ['Seeking Admission For', fd.admission_grade],
        ['Transportation',        fd.transport],
        ['Extended Care',         fd.extended_care],
        ['Start Time',            fd.start_time      || '—'],
        ['End Time',              fd.end_time        || '—'],
      ],
    },
    {
      section: 'FIRST PARENT / GUARDIAN',
      fields: [
        ['Title',                   fd.p1_title          || '—'],
        ['First Name',              fd.p1_fname          || '—'],
        ['Middle Name',             fd.p1_mname          || '—'],
        ['Last Name',               fd.p1_lname          || '—'],
        ['Relationship to Child',   fd.p1_relation       || '—'],
        ['Parental Responsibility', fd.p1_responsibility],
        ['Home Telephone',          fd.p1_home           || '—'],
        ['Mobile Phone',            fd.p1_mobile         || '—'],
        ['Email Address',           fd.p1_email          || '—'],
        ['Work Telephone',          fd.p1_worktel        || '—'],
        ['Work Place',              fd.p1_workplace      || '—'],
      ],
    },
    {
      section: 'SECOND PARENT / GUARDIAN',
      fields: [
        ['Title',                   fd.p2_title          || '—'],
        ['First Name',              fd.p2_fname          || '—'],
        ['Middle Name',             fd.p2_mname          || '—'],
        ['Last Name',               fd.p2_lname          || '—'],
        ['Relationship to Child',   fd.p2_relation       || '—'],
        ['Parental Responsibility', fd.p2_responsibility],
        ['Home Telephone',          fd.p2_home           || '—'],
        ['Mobile Phone',            fd.p2_mobile         || '—'],
        ['Email Address',           fd.p2_email          || '—'],
        ['Work Telephone',          fd.p2_worktel        || '—'],
        ['Work Place',              fd.p2_workplace      || '—'],
      ],
    },
    {
      section: 'OTHER CHILDREN IN FAMILY',
      fields: [['Other Children', fd.other_children || '—']],
    },
    {
      section: 'SUPPLEMENTARY DETAILS',
      fields: [
        ['Previous Schools / Day-Care',   fd.schools         || '—'],
        ['Serious Illnesses or Injuries', fd.illness         || '—'],
        ['Immunization Completed',        fd.immunization    || '—'],
        ['Allergies / Medical Conditions',fd.allergies       || '—'],
        ['Special Needs',                 fd.special_needs   || '—'],
        ['Potty Trained',                 fd.potty_trained],
        ['Fears',                         fd.fears           || '—'],
        ['Milk / Dairy Preferences',      fd.milk            || '—'],
        ['Preferred Activities',          fd.activities_pref || '—'],
        ['Food the Child Enjoys',         fd.food            || '—'],
        ['Height',                        fd.height          || '—'],
        ['Weight',                        fd.weight          || '—'],
      ],
    },
    {
      section: 'PERSON WHO MAY PICK UP CHILD',
      fields: [['Pickup Person(s)', fd.pickup || '—']],
    },
    {
      section: 'DECLARATION',
      fields: [
        ['Parent / Guardian Name', fd.parent_name      || '—'],
        ['Date',                   fd.declaration_date || '—'],
      ],
    },
  ];

  const submitForm = (e) => {
    e.preventDefault();
    const snapshot = buildSections(formData);
    setPreviewData(snapshot);
    setSubmitted(true);
    setShowSuccess(true);
    setTimeout(() => {
      document.getElementById('previewCopy')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    const childName  = [formData.child_fname, formData.child_mname, formData.child_lname].filter(Boolean).join(' ');
    const parentName = [formData.p1_fname, formData.p1_lname].filter(Boolean).join(' ');
    emailjs.send('service_pdkqwkv', 'template_rse8l96', {
      parent_name: parentName, child_name: childName,
      admission_class: formData.admission_grade,
      address: formData.address, mobile: formData.p1_mobile,
    }).then((r) => console.log('Email sent!', r.status))
      .catch((err) => console.error('Email failed:', err));
  };

  const downloadPDF = () => {
    setLoading(true);
    try {
      // KEY FIX: always rebuild from live formData — not the preview snapshot
      const sections = buildSections(formData);
      const doc    = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageW  = doc.internal.pageSize.getWidth();
      const pageH  = doc.internal.pageSize.getHeight();
      const margin = 14;

      // Title header
      doc.setFillColor(26, 111, 163);
      doc.rect(0, 0, pageW, 24, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(17);
      doc.setFont('helvetica', 'bold');
      doc.text('Kids Cosmos School', pageW / 2, 11, { align: 'center' });
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text('Admission / Registration Form', pageW / 2, 18.5, { align: 'center' });

      let y = 32;

      sections.forEach((section) => {
        // KEY FIX: include ALL rows — no filtering
        const rows = section.fields.map(([label, value]) => [label, String(value)]);

        // Page break before section header if needed
        if (y > pageH - 40) { doc.addPage(); y = 20; }

        // Section header bar
        doc.setFillColor(43, 176, 237);
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.rect(margin, y, pageW - margin * 2, 8, 'F');
        doc.text(section.section, margin + 3, y + 5.5);
        y += 10;

        // Table — autoTable handles its own page breaks internally
        autoTable(doc, {
          startY: y,
          head: [],
          body: rows,
          theme: 'grid',
          styles: {
            fontSize: 9,
            cellPadding: { top: 3, bottom: 3, left: 4, right: 4 },
            valign: 'middle',
            overflow: 'linebreak',
            lineColor: [210, 228, 240],
            lineWidth: 0.3,
          },
          columnStyles: {
            0: { cellWidth: 58, fontStyle: 'bold', fillColor: [240, 249, 255], textColor: [26, 61, 82] },
            1: { cellWidth: pageW - margin * 2 - 58, textColor: [50, 50, 50] },
          },
          margin: { left: margin, right: margin },
          didParseCell: (data) => {
            if (data.row.index % 2 === 1 && data.column.index === 1) {
              data.cell.styles.fillColor = [248, 252, 255];
            }
          },
          // Re-draw page header on continuation pages
          didDrawPage: (data) => {
            if (data.pageNumber > 1) {
              doc.setFillColor(26, 111, 163);
              doc.rect(0, 0, pageW, 12, 'F');
              doc.setTextColor(255, 255, 255);
              doc.setFontSize(8);
              doc.setFont('helvetica', 'bold');
              doc.text('Kids Cosmos School — Admission Form (continued)', pageW / 2, 8, { align: 'center' });
            }
          },
        });

        // KEY FIX: switch to current page after autoTable (it may have added pages)
        doc.setPage(doc.internal.getNumberOfPages());
        y = doc.lastAutoTable.finalY + 9;
      });

      // Footer on every page
      const total = doc.internal.getNumberOfPages();
      for (let pg = 1; pg <= total; pg++) {
        doc.setPage(pg);
        doc.setDrawColor(210, 228, 240);
        doc.setLineWidth(0.4);
        doc.line(margin, pageH - 13, pageW - margin, pageH - 13);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.setFont('helvetica', 'normal');
        doc.text(
          `Kids Cosmos School  —  Admission / Registration Form  |  Page ${pg} of ${total}`,
          pageW / 2, pageH - 7, { align: 'center' }
        );
      }

      const name = [formData.child_fname, formData.child_lname].filter(Boolean).join('_') || 'Form';
      doc.save(`Admission_${name}.pdf`);
    } catch (err) {
      console.error('PDF error:', err);
      alert('PDF Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      dob: '', gender: 'Male', child_fname: '', child_mname: '', child_lname: '',
      religion: '', language: '', address: '', preferred_name: '', admission_grade: 'Playgroup',
      transport: 'No', extended_care: 'No', start_time: '', end_time: '',
      p1_title: '', p1_fname: '', p1_mname: '', p1_lname: '', p1_relation: '',
      p1_responsibility: 'Yes', p1_home: '', p1_mobile: '', p1_email: '', p1_worktel: '', p1_workplace: '',
      p2_title: '', p2_fname: '', p2_mname: '', p2_lname: '', p2_relation: '',
      p2_responsibility: 'Yes', p2_home: '', p2_mobile: '', p2_email: '', p2_worktel: '', p2_workplace: '',
      other_children: '', schools: '', illness: '', immunization: '', allergies: '',
      special_needs: '', potty_trained: 'Yes', fears: '', milk: '', activities_pref: '',
      food: '', height: '', weight: '', pickup: '', parent_name: '', declaration_date: '',
    });
    setSubmitted(false);
    setPreviewData(null);
    setShowSuccess(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const inp = { width:'100%', padding:'10px 12px', border:'1px solid #cfdfea', borderRadius:'6px', fontSize:'14px', fontFamily:'inherit', boxSizing:'border-box', transition:'border-color .2s, box-shadow .2s', background:'white' };
  const lbl = { display:'block', marginTop:'14px', marginBottom:'5px', fontWeight:'600', fontSize:'13.5px', color:'#334' };
  const sec = { marginBottom:'32px', paddingBottom:'32px', borderBottom:'2px solid #eaf6ff' };
  const h2s = { color:'#1a6fa3', fontSize:'17px', fontWeight:'700', paddingBottom:'10px', borderBottom:'1px solid #dbeaf5', marginTop:0, display:'flex', alignItems:'center', gap:'8px' };
  const g2  = { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'16px', marginTop:'4px' };
  const g4  = { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'16px' };

  return (
    <div style={{ backgroundColor:'#f0f9ff', minHeight:'100vh', padding:'32px 20px' }}>
      <div style={{ maxWidth:'980px', margin:'0 auto', backgroundColor:'white', borderRadius:'12px', padding:'36px 40px', boxShadow:'0 6px 32px rgba(43,176,237,0.12)' }}>

        <div style={{ marginBottom:'20px' }}>
          <a href="/" style={{ color:'#1a6fa3', textDecoration:'none', fontSize:'18px', fontWeight:'700' }}>← Back</a>
        </div>

        <div style={{ textAlign:'center', marginBottom:'32px' }}>
          <h1 style={{ color:'#1a3d52', fontSize:'28px', fontWeight:'900', marginBottom:'8px' }}>🎓 Admission / Registration Form</h1>
          <p style={{ color:'#666', fontSize:'16px' }}>Welcome to Kids Cosmos School! Complete this form to apply for admission.</p>
        </div>

        {showSuccess && (
          <div style={{ background:'#e4f3ff', color:'#0d5490', padding:'18px 22px', borderRadius:'8px', marginBottom:'24px', border:'1px solid #b8ddf7', display:'flex', alignItems:'flex-start', gap:'12px' }}>
            <span style={{ fontSize:'22px' }}>✅</span>
            <div>
              <strong style={{ display:'block', marginBottom:'4px' }}>Form Submitted Successfully!</strong>
              <span style={{ fontSize:'14px' }}>Preview shown below — scroll down and click "Download Full PDF".</span>
            </div>
          </div>
        )}

        <form onSubmit={submitForm}>

          {/* Child Details */}
          <section style={sec}>
            <h2 style={h2s}><span>👶</span> Child's Details</h2>
            <div style={g2}>
              <div><label style={lbl}>Date of Birth</label><input type="date" id="dob" value={formData.dob} onChange={handleInputChange} style={inp} /></div>
              <div><label style={lbl}>Gender</label>
                <select id="gender" value={formData.gender} onChange={handleInputChange} style={inp}>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
            </div>
            <div style={g4}>
              <div><label style={lbl}>First Name</label><input type="text" id="child_fname" value={formData.child_fname} onChange={handleInputChange} style={inp} /></div>
              <div><label style={lbl}>Middle Name</label><input type="text" id="child_mname" value={formData.child_mname} onChange={handleInputChange} style={inp} /></div>
              <div><label style={lbl}>Last Name</label><input type="text" id="child_lname" value={formData.child_lname} onChange={handleInputChange} style={inp} /></div>
            </div>
            <label style={lbl}>Religion / Culture Practiced at Home</label>
            <input type="text" id="religion" value={formData.religion} onChange={handleInputChange} style={inp} />
            <label style={lbl}>Language Spoken at Home</label>
            <input type="text" id="language" value={formData.language} onChange={handleInputChange} style={inp} />
            <label style={lbl}>Current Residential Address</label>
            <textarea id="address" value={formData.address} onChange={handleInputChange} rows="3" style={{ ...inp, resize:'vertical' }} />
            <label style={lbl}>Preferred Choice of Name (if any)</label>
            <input type="text" id="preferred_name" value={formData.preferred_name} onChange={handleInputChange} style={inp} />
            <label style={lbl}>Seeking Admission For</label>
            <select id="admission_grade" value={formData.admission_grade} onChange={handleInputChange} style={inp}>
              <option>Playgroup</option><option>Nursery</option><option>L.K.G</option><option>U.K.G</option>
              <option>One</option><option>Two</option><option>Three</option><option>Four</option>
            </select>
            <div style={g2}>
              <div><label style={lbl}>Transportation Needs</label><select id="transport" value={formData.transport} onChange={handleInputChange} style={inp}><option>No</option><option>Yes</option></select></div>
              <div><label style={lbl}>Extended Care Needs</label><select id="extended_care" value={formData.extended_care} onChange={handleInputChange} style={inp}><option>No</option><option>Yes</option></select></div>
            </div>
            <div style={g2}>
              <div><label style={lbl}>Start Time</label><input type="time" id="start_time" value={formData.start_time} onChange={handleInputChange} style={inp} /></div>
              <div><label style={lbl}>End Time</label><input type="time" id="end_time" value={formData.end_time} onChange={handleInputChange} style={inp} /></div>
            </div>
          </section>

          {/* Parent 1 */}
          <section style={sec}>
            <h2 style={h2s}><span>👨‍👩‍👧</span> First Parent / Guardian</h2>
            <div style={g4}>
              <div><label style={lbl}>Title</label><input type="text" id="p1_title" value={formData.p1_title} onChange={handleInputChange} style={inp} /></div>
              <div><label style={lbl}>First Name</label><input type="text" id="p1_fname" value={formData.p1_fname} onChange={handleInputChange} style={inp} /></div>
              <div><label style={lbl}>Middle Name</label><input type="text" id="p1_mname" value={formData.p1_mname} onChange={handleInputChange} style={inp} /></div>
              <div><label style={lbl}>Last Name</label><input type="text" id="p1_lname" value={formData.p1_lname} onChange={handleInputChange} style={inp} /></div>
            </div>
            <div style={g2}>
              <div><label style={lbl}>Relationship to Child</label><input type="text" id="p1_relation" value={formData.p1_relation} onChange={handleInputChange} style={inp} /></div>
              <div><label style={lbl}>Parental Responsibility</label><select id="p1_responsibility" value={formData.p1_responsibility} onChange={handleInputChange} style={inp}><option>Yes</option><option>No</option></select></div>
            </div>
            <div style={g2}>
              <div><label style={lbl}>Home Telephone</label><input type="tel" id="p1_home" value={formData.p1_home} onChange={handleInputChange} style={inp} /></div>
              <div><label style={lbl}>Mobile Phone</label><input type="tel" id="p1_mobile" value={formData.p1_mobile} onChange={handleInputChange} style={inp} /></div>
            </div>
            <div style={g2}>
              <div><label style={lbl}>Email Address</label><input type="email" id="p1_email" value={formData.p1_email} onChange={handleInputChange} style={inp} /></div>
              <div><label style={lbl}>Work Telephone</label><input type="tel" id="p1_worktel" value={formData.p1_worktel} onChange={handleInputChange} style={inp} /></div>
            </div>
            <label style={lbl}>Work Place</label>
            <input type="text" id="p1_workplace" value={formData.p1_workplace} onChange={handleInputChange} style={inp} />
          </section>

          {/* Parent 2 */}
          <section style={sec}>
            <h2 style={h2s}><span>👨‍👩‍👦</span> Second Parent / Guardian</h2>
            <div style={g4}>
              <div><label style={lbl}>Title</label><input type="text" id="p2_title" value={formData.p2_title} onChange={handleInputChange} style={inp} /></div>
              <div><label style={lbl}>First Name</label><input type="text" id="p2_fname" value={formData.p2_fname} onChange={handleInputChange} style={inp} /></div>
              <div><label style={lbl}>Middle Name</label><input type="text" id="p2_mname" value={formData.p2_mname} onChange={handleInputChange} style={inp} /></div>
              <div><label style={lbl}>Last Name</label><input type="text" id="p2_lname" value={formData.p2_lname} onChange={handleInputChange} style={inp} /></div>
            </div>
            <div style={g2}>
              <div><label style={lbl}>Relationship to Child</label><input type="text" id="p2_relation" value={formData.p2_relation} onChange={handleInputChange} style={inp} /></div>
              <div><label style={lbl}>Parental Responsibility</label><select id="p2_responsibility" value={formData.p2_responsibility} onChange={handleInputChange} style={inp}><option>Yes</option><option>No</option></select></div>
            </div>
            <div style={g2}>
              <div><label style={lbl}>Home Telephone</label><input type="tel" id="p2_home" value={formData.p2_home} onChange={handleInputChange} style={inp} /></div>
              <div><label style={lbl}>Mobile Phone</label><input type="tel" id="p2_mobile" value={formData.p2_mobile} onChange={handleInputChange} style={inp} /></div>
            </div>
            <div style={g2}>
              <div><label style={lbl}>Email Address</label><input type="email" id="p2_email" value={formData.p2_email} onChange={handleInputChange} style={inp} /></div>
              <div><label style={lbl}>Work Telephone</label><input type="tel" id="p2_worktel" value={formData.p2_worktel} onChange={handleInputChange} style={inp} /></div>
            </div>
            <label style={lbl}>Work Place</label>
            <input type="text" id="p2_workplace" value={formData.p2_workplace} onChange={handleInputChange} style={inp} />
          </section>

          {/* Other Children */}
          <section style={sec}>
            <h2 style={h2s}><span>👨‍👩‍👧‍👦</span> Other Children in Family</h2>
            <textarea id="other_children" value={formData.other_children} onChange={handleInputChange}
              placeholder="Name(s) and date of birth" rows="3" style={{ ...inp, resize:'vertical', marginTop:'8px' }} />
          </section>

          {/* Supplementary */}
          <section style={sec}>
            <h2 style={h2s}><span>📋</span> Supplementary Details</h2>
            <label style={lbl}>Previous Child Day-Care Programs / Schools</label>
            <textarea id="schools" value={formData.schools} onChange={handleInputChange} placeholder="If not attended, indicate N/A" rows="2" style={{ ...inp, resize:'vertical' }} />
            <label style={lbl}>Serious Illnesses or Injuries</label>
            <textarea id="illness" value={formData.illness} onChange={handleInputChange} rows="2" style={{ ...inp, resize:'vertical' }} />
            <label style={lbl}>Immunization Completed</label>
            <textarea id="immunization" value={formData.immunization} onChange={handleInputChange} rows="2" style={{ ...inp, resize:'vertical' }} />
            <label style={lbl}>Allergies / Medical Conditions</label>
            <textarea id="allergies" value={formData.allergies} onChange={handleInputChange} rows="2" style={{ ...inp, resize:'vertical' }} />
            <label style={lbl}>Special Needs</label>
            <textarea id="special_needs" value={formData.special_needs} onChange={handleInputChange} rows="2" style={{ ...inp, resize:'vertical' }} />
            <label style={lbl}>Potty Trained</label>
            <select id="potty_trained" value={formData.potty_trained} onChange={handleInputChange} style={inp}><option>Yes</option><option>No</option></select>
            <label style={lbl}>Fears</label>
            <textarea id="fears" value={formData.fears} onChange={handleInputChange} rows="2" style={{ ...inp, resize:'vertical' }} />
            <label style={lbl}>Milk / Dairy Preferences</label>
            <textarea id="milk" value={formData.milk} onChange={handleInputChange} rows="2" style={{ ...inp, resize:'vertical' }} />
            <label style={lbl}>Activities the Child Prefers</label>
            <textarea id="activities_pref" value={formData.activities_pref} onChange={handleInputChange} rows="2" style={{ ...inp, resize:'vertical' }} />
            <label style={lbl}>Food the Child Enjoys</label>
            <textarea id="food" value={formData.food} onChange={handleInputChange} rows="2" style={{ ...inp, resize:'vertical' }} />
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginTop:'4px' }}>
              <div><label style={lbl}>Child Height</label><input type="text" id="height" value={formData.height} onChange={handleInputChange} style={inp} /></div>
              <div><label style={lbl}>Child Weight</label><input type="text" id="weight" value={formData.weight} onChange={handleInputChange} style={inp} /></div>
            </div>
          </section>

          {/* Pickup */}
          <section style={sec}>
            <h2 style={h2s}><span>🚗</span> Person Who May Pick Up Child</h2>
            <textarea id="pickup" value={formData.pickup} onChange={handleInputChange} rows="3" style={{ ...inp, resize:'vertical', marginTop:'8px' }} />
          </section>

          {/* Declaration */}
          <section style={{ marginBottom:'32px' }}>
            <h2 style={h2s}><span>📝</span> Declaration</h2>
            <p style={{ color:'#555', fontSize:'14px', lineHeight:'1.6', marginBottom:'12px', background:'#f8fcff', padding:'14px 16px', borderRadius:'8px', border:'1px solid #daeeff' }}>
              I certify that all information above is true and correct. I acknowledge that money once paid is not refundable.
            </p>
            <label style={lbl}>Parent / Guardian Name</label>
            <input type="text" id="parent_name" value={formData.parent_name} onChange={handleInputChange} style={inp} />
            <label style={lbl}>Date</label>
            <input type="date" id="declaration_date" value={formData.declaration_date} onChange={handleInputChange} style={inp} />
          </section>

          <div style={{ display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap', marginTop:'28px' }}>
            <button type="submit"
              style={{ padding:'14px 42px', background:'linear-gradient(135deg,#1a6fa3,#2bb0ed)', color:'white', border:'none', borderRadius:'50px', fontSize:'15px', fontWeight:'700', cursor:'pointer', boxShadow:'0 4px 18px rgba(43,176,237,0.35)', transition:'all .3s' }}
              onMouseEnter={e=>e.currentTarget.style.transform='translateY(-3px)'}
              onMouseLeave={e=>e.currentTarget.style.transform='none'}>
              📋 Submit Form &amp; Preview
            </button>
            <button type="button" onClick={resetForm}
              style={{ padding:'14px 42px', background:'transparent', color:'#1a6fa3', border:'2px solid #2bb0ed', borderRadius:'50px', fontSize:'15px', fontWeight:'700', cursor:'pointer', transition:'all .3s' }}
              onMouseEnter={e=>e.currentTarget.style.background='#e4f3ff'}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              🔄 Reset Form
            </button>
          </div>
        </form>

        {/* Preview */}
        {submitted && previewData && (
          <section id="previewCopy" style={{ marginTop:'48px', padding:'32px', background:'#f8fcff', borderRadius:'12px', border:'1px solid #daeeff' }}>
            <h2 style={{ color:'#1a3d52', textAlign:'center', marginBottom:'28px', fontSize:'22px', fontWeight:'800' }}>📄 Admission Form Preview</h2>
            {previewData.map((section, idx) => (
              <div key={idx} style={{ marginBottom:'28px' }}>
                <div style={{ background:'linear-gradient(90deg,#1a6fa3,#2bb0ed)', color:'white', padding:'10px 16px', fontWeight:'700', fontSize:'13px', letterSpacing:'1px', textTransform:'uppercase', borderRadius:'6px 6px 0 0' }}>
                  {section.section}
                </div>
                <table style={{ width:'100%', borderCollapse:'collapse', background:'white', boxShadow:'0 2px 12px rgba(43,176,237,0.08)' }}>
                  <tbody>
                    {section.fields.map(([label, value]) => (
                      <tr key={label} style={{ borderBottom:'1px solid #eaf6ff' }}>
                        <td style={{ padding:'10px 14px', background:'#f0f9ff', fontWeight:'600', width:'36%', fontSize:'13.5px', color:'#1a3d52', borderRight:'1px solid #daeeff' }}>{label}</td>
                        <td style={{ padding:'10px 14px', fontSize:'13.5px', color: value === '—' ? '#bbb' : '#444', fontStyle: value === '—' ? 'italic' : 'normal' }}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
            <div style={{ textAlign:'center', marginTop:'28px' }}>
              <button onClick={downloadPDF} disabled={loading}
                style={{ padding:'15px 48px', background: loading ? '#aaa' : 'linear-gradient(135deg,#1a6fa3,#2bb0ed)', color:'white', border:'none', borderRadius:'50px', fontSize:'16px', fontWeight:'700', cursor: loading ? 'not-allowed' : 'pointer', boxShadow:'0 4px 20px rgba(43,176,237,0.35)', transition:'all .3s' }}
                onMouseEnter={e=>{ if(!loading) e.currentTarget.style.transform='translateY(-3px)'; }}
                onMouseLeave={e=>e.currentTarget.style.transform='none'}>
                {loading ? '⏳ Generating PDF...' : '📥 Download Full PDF'}
              </button>
            </div>
          </section>
        )}
      </div>
      <style>{`input:focus,select:focus,textarea:focus{outline:none;border-color:#2bb0ed!important;box-shadow:0 0 0 3px rgba(43,176,237,0.15)!important;}`}</style>
    </div>
  );
}

export default Admission;