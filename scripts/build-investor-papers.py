from pathlib import Path
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, Flowable
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors
from pypdf import PdfReader
import re
# Builds public/investors/white-paper.pdf and overview.pdf. Run: python3 -I scripts/build-investor-papers.py (needs reportlab, pypdf)
OUT=Path(__file__).resolve().parent.parent/'public'/'investors'
INK=colors.HexColor('#142D2B'); GREEN=colors.HexColor('#167865'); MUTED=colors.HexColor('#536663'); PALE=colors.HexColor('#F0F5F2'); LINE=colors.HexColor('#CDDBD5')
styles={
 'kicker':ParagraphStyle('kicker',fontName='Helvetica-Bold',fontSize=8.4,leading=11,textColor=GREEN,spaceAfter=14),
 'title':ParagraphStyle('title',fontName='Times-Roman',fontSize=35,leading=37,textColor=INK,spaceAfter=14),
 'h1':ParagraphStyle('h1',fontName='Times-Roman',fontSize=27,leading=30,textColor=INK,spaceAfter=14),
 'h2':ParagraphStyle('h2',fontName='Helvetica-Bold',fontSize=11,leading=14,textColor=INK,spaceBefore=11,spaceAfter=5),
 'body':ParagraphStyle('body',fontName='Helvetica',fontSize=10.2,leading=14.4,textColor=INK,spaceAfter=9),
 'lead':ParagraphStyle('lead',fontName='Helvetica',fontSize=12,leading=17,textColor=INK,spaceAfter=13),
 'small':ParagraphStyle('small',fontName='Helvetica',fontSize=8.1,leading=10.7,textColor=MUTED,spaceAfter=7),
 'cell':ParagraphStyle('cell',fontName='Helvetica',fontSize=9.2,leading=12.4,textColor=INK),
 'th':ParagraphStyle('th',fontName='Helvetica-Bold',fontSize=8.5,leading=11,textColor=GREEN),
 'stat':ParagraphStyle('stat',fontName='Times-Roman',fontSize=29,leading=32,textColor=GREEN),
}
story=[];plain=[]
def p(t,s='body'):
 story.append(Paragraph(t,styles[s]));plain.append(re.sub('<[^>]+>','',t)+'\n')
def h(t):p(t,'h2')
def page(n,t):
 story.append(PageBreak());p(f'THE LIGHT COMPANY  /  WHITE PAPER  /  {n:02d}','kicker');p(t,'h1')
def table(headers,rows,widths):
 d=[[Paragraph(v,styles['th']) for v in headers]]+[[Paragraph(v,styles['cell']) for v in r] for r in rows]
 t=Table(d,colWidths=widths,hAlign='LEFT');t.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('BACKGROUND',(0,0),(-1,0),PALE),('LEFTPADDING',(0,0),(-1,-1),10),('RIGHTPADDING',(0,0),(-1,-1),10),('TOPPADDING',(0,0),(-1,-1),8),('BOTTOMPADDING',(0,0),(-1,-1),8),('LINEBELOW',(0,0),(-1,-1),.4,LINE)]));story.extend([t,Spacer(1,10)]);plain.append('\n'.join(' | '.join(r) for r in [headers]+rows))
def callout(t):
 box=Table([[Paragraph(t,styles['lead'])]],colWidths=[504]);box.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),PALE),('LINEBEFORE',(0,0),(0,0),2,GREEN),('LEFTPADDING',(0,0),(-1,-1),14),('RIGHTPADDING',(0,0),(-1,-1),14),('TOPPADDING',(0,0),(-1,-1),12),('BOTTOMPADDING',(0,0),(-1,-1),2)]));story.extend([box,Spacer(1,11)]);plain.append(t)
def stats():
 vals=[('10','UNITS SOLD + DEPLOYED'),('3','CUSTOMERS'),('$15,000','HARDWARE SALES VALUE')]
 d=[[Paragraph(v,styles['stat']) for v,l in vals],[Paragraph(l,styles['th']) for v,l in vals]]
 t=Table(d,colWidths=[168]*3);t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),PALE),('LEFTPADDING',(0,0),(-1,-1),13),('TOPPADDING',(0,0),(-1,0),10),('BOTTOMPADDING',(0,1),(-1,1),11)]));story.extend([t,Spacer(1,9)]);plain.append('10 units sold | 3 customers | $15,000 hardware sales value')
def impact():
 d=[[Paragraph('10x',styles['stat']),Paragraph('92.5%',styles['stat'])],[Paragraph('EVALUATION EFFICIENCY',styles['th']),Paragraph('LOWER VARIABILITY',styles['th'])],[Paragraph('By run count: 300 to 30',styles['small']),Paragraph('40% to 3% in 30 days',styles['small'])]]
 t=Table(d,colWidths=[252,252]);t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),PALE),('LEFTPADDING',(0,0),(-1,-1),13),('TOPPADDING',(0,0),(-1,0),9),('BOTTOMPADDING',(0,2),(-1,2),6)]));story.extend([t,Spacer(1,9)]);plain.append('10x evaluation efficiency by run count: 300 to 30 | 92.5% lower variability: 40% to 3%')
class Loop(Flowable):
 def __init__(self):super().__init__();self.width=504;self.height=65
 def draw(self):
  c=self.canv
  for i,(a,b) in enumerate([('DEFINE','Target state'),('PROJECT','Show placement'),('VERIFY','Check the reset'),('BLANK','Remove the cue'),('RUN','Test the policy'),('RECORD','State + outcome')]):
   x=i*85;c.setFillColor(PALE);c.roundRect(x,8,79,52,4,fill=1,stroke=0);c.setFillColor(GREEN);c.setFont('Helvetica-Bold',8);c.drawCentredString(x+39.5,40,a);c.setFillColor(INK);c.setFont('Helvetica',7.4);c.drawCentredString(x+39.5,24,b)

def footer(c,d):
 c.setStrokeColor(LINE);c.setLineWidth(.5);c.line(54,48,558,48);c.setFont('Helvetica',7.7);c.setFillColor(MUTED);c.drawString(54,33,'THE LIGHT COMPANY  /  PRISM');c.drawRightString(558,33,f'NOVEMBER 2026  /  {d.page}')
def finish(name,title):
 doc=SimpleDocTemplate(str(OUT/name),pagesize=(612,792),leftMargin=54,rightMargin=54,topMargin=54,bottomMargin=62,title=title,author='The Light Company',subject='Intelligence for the physical world: projected AR and repeatable robot evaluation')
 doc.build(story,onFirstPage=footer,onLaterPages=footer)
 r=PdfReader(OUT/name);print(name,len(r.pages),'pages')
 for i,pg in enumerate(r.pages):print(i+1,len(pg.extract_text()))

p('THE LIGHT COMPANY  /  WHITE PAPER','kicker')
p('Intelligence for<br/>the physical world.','title')
p('AR without glasses. Intelligent light that guides the next action.','lead')
p('The Light Company is building augmented reality that appears directly on the world around us. Projected light shows people what to do, where to do it, and what comes next. Cameras connect that guidance to the real task. The vision is a system that understands physical work and guides it step by step, from the first action to completion.')
h('Make the world the interface')
p('A digital instruction still leaves a person to translate it into a physical action. Which part? Which position? Which direction? Prism brings the instruction to the point of action. An outline can show where an object belongs. A highlight can identify the next component. Verification can tell the system when to advance.')
p('This is the company\'s original vision for AR: shared, useful guidance on real surfaces, without a headset or glasses. Robotics evaluation is the first commercial wedge into that larger opportunity.')
impact()
p('<b>10 paid units. 3 paying customers. 20 stations running in labs.</b><br/>Enact 5 | New Theory 4 | Trossen Robotics 1. [1, 2]','small')
h('Replace guesswork with measured engineering')
p('A robotics team needs to know whether its new policy improved. If every physical reset changes the test, that decision becomes guesswork. Prism makes the starting condition repeatable and verifiable. Teams can compare like with like, investigate failures, and build the next generation of physical AI through measurement.')
p('<b>The first product makes physical tests repeatable. The larger vision makes physical work intelligently guided.</b>')

page(2,'The test changes before the robot moves.')
p('Software can copy a test input. A robot lab has to recreate part of that input in the physical world. That is the initial-condition problem.','lead')
h('A fixed station can still produce a different test')
p('The robot, table, cameras, and lighting can remain fixed. After every attempt, someone still has to put the objects back. Position, orientation, spacing, and arrangement become part of the next input. If those conditions change unintentionally, the team is no longer making the same comparison.')
p('Imagine comparing two robot policies on a picking task. The first sees an object near the center of the table. The second sees it slightly rotated or closer to the edge. A different result can reflect the policy, the placement, or both. Without a reliable starting state, the team has less confidence in what the result means.')
h('The cost spreads through the learning process')
p('Evaluation informs which model to keep, which failure to investigate, and which data to collect next. Uncontrolled setup variation can send each of those decisions in the wrong direction. A false regression can trigger unnecessary debugging; a false improvement can hide a weakness. Initial conditions are therefore part of the measurement system, not a minor setup detail. Research on robot evaluation identifies this need for explicit conditions and richer evidence. [4]')
h('What Prism solves')
p('Prism turns a desired placement into a physical instruction. The operator resets the scene using projected guidance. The calibrated camera system checks the placement against the target and its tolerance. Guidance is removed before the robot acts, and the test result can be linked to its starting state. [2]')
story.append(Loop());story.append(Spacer(1,8))
callout('<b>Define the physical input. Recreate it. Verify it. Then compare the policy.</b>')
p('This creates two useful modes: repeat the same states to compare policy versions, or vary states deliberately to find where a policy fails. Prism then scores every run against the team\'s rubric and records the reason with the recording.')

page(3,'A concrete need. Three customers.')
table(['Customer','Deployed','Commercial signal'],[
 ('Enact (YC S26)','5','Needed one unit; bought five after one demo to improve initial-condition setup.'),
 ('New Theory','4','Four units in the field for robot evaluation.'),
 ('Trossen Robotics','1','One unit in the field; pilot underway.'),
 ('Total','10','$15,000 in hardware at $1,500 per unit, 80% margin.')
],[119,67,318])
p('All ten units are deployed in the field. Each station sells for $1,500 and costs about $300 to build and deploy: an 80% margin. [1]','small')
h('Why Enact bought five after one demo')
p('Enact needed consistent initial-condition setup. Operators received placement guidance directly in the scene, helping them repeat the intended setup rather than reconstruct it from memory. Enact initially needed one unit and purchased five after the demonstration. [1]')
p('The reported evaluation workload fell from 300-400 runs to about 30. Using the conservative 300-run baseline, that is a <b>10x improvement in evaluation efficiency by run count: 90% fewer runs.</b> The customer rationale is direct: more consistent setup reduces the need to repeat noisy evaluations.')
impact()
p('The variability figure is New Theory\'s 30-day measurement: 40% to 3%. The 300-to-30 run-count result is Enact\'s. [1, 2]','small')
p('Enact\'s published workflow also includes recreating failure states and collecting recovery data. This explains why repeatable physical inputs fit its daily work. YC lists Enact in its Summer 2026 batch. [3]')
h('Find the missing data, not just more data')
p('A large dataset can still leave some positions, orientations, or situations undersampled. The planned capability maps would show where tests succeed, where they fail, and where coverage is thin. Teams could target those gaps, collect relevant demonstrations, retrain, and repeat the same test. A failure map identifies where to investigate; comparison with training coverage helps determine whether missing data is the cause.')

page(4,'One station sale. Software on every run.')
p('A Prism Station sells for $1,500 and costs about $300 to build and deploy: an 80% margin on every unit. The station opens the account. Every evaluation after that runs through Prism\'s software, and a lab re-tests every time its model changes, so revenue recurs with its training cadence. Enact started with one station and runs five. [1]','lead')
h('Five revenue lines')
table(['Line','Target price','What it covers'],[
 ('Station','$1,500, 80% margin','One per workcell, over the robots a lab already has.'),
 ('Evaluations','$1 per verified evaluation','Every scored trial: about $25,000 per station a year.'),
 ('Platform','$50 per seat a month','Console, replay and case library. Four seats per station.'),
 ('Tooling','$50,000 per lab a year','SDK, scoring API beyond the station, benchmark access.'),
 ('Enterprise','$150,000 per lab a year','Multi-site fleets, SSO, on-prem scoring; 10+ stations.')
],[86,130,288])
h('Annual software revenue')
table(['Labs x stations per lab','Evaluations','Platform, tooling, enterprise','Total'],[
 ('10 x 5','$1.25M','$0.62M','$1.87M'),
 ('50 x 20','$25M','$12.4M','$37.4M'),
 ('250 x 20','$125M','$62M','$187M')
],[150,110,154,90])
callout('<b>250 labs at 20 stations each: $187M a year in software.</b><br/>Plus $7.5M in stations at an 80% margin. Evaluations alone reach $25M at 1,000 stations.')
h('Who buys, and how many stations')
p('More than 70 companies build robot foundation models, and 16,000 humanoids were installed in 2025, with 100,000 expected by 2027. Data teams run 10 to 100+ robots at once; each workcell under test is a station. Applied Intuition, testing and validation software for self-driving cars, is valued at $15 billion. Prism is that layer for robots. [6]')

page(5,'Build the wedge. Expand the vision.')
h('A focused route to a much larger product')
p('<b>First: make robot tests repeatable.</b> Deliver dependable guidance and verification, document reset accuracy, and establish the customer\'s baseline. Convert early use into regular paid activity.')
p('<b>Next: expose failures and coverage gaps.</b> Map performance by physical condition and track how often each condition was tested. Compare these maps with available training coverage, collect data for undersampled states, and retest after training. Measure whether the failure region shrinks.')
p('<b>Then: extend intelligent guidance into physical work.</b> Assembly, repair, training, and other tasks use the same interaction: understand the current state, show the next action, check the result, and continue. Each new workflow requires its own task knowledge and verification.')
h('What can compound')
p('Reusable workflows, calibration tools, integrations, and customer task history can make the system more valuable with repeated use. The goal is software that knows how to guide a task and recognize its completion. Customer data remains subject to agreed rights; cross-customer access is not assumed.')
p('Alternative approaches include fixtures, internal procedures, and autonomous reset systems such as AutoEval. [5] Prism\'s position is flexible projected guidance with state verification in the customer\'s workspace. Its advantage must come from dependable execution and useful software, not projection alone.')
callout('<b>Raising our seed</b><br/>To ship 100 stations into labs, make the software self-serve, and publish the first public benchmark of verified physical test cases.')
h('Notes and sources')
p('[1] Company records: 10 paid units across Enact (5), New Theory (4), and Trossen Robotics (1) at $1,500 each, about $300 each to build and deploy. Enact bought five after one demo; its runs fell from 300-400 to 30.','small')
p('[2] The Light Company deck and explainer: product sequence and New Theory field report. 300 / 30 = 10; (40 - 3) / 40 = 92.5%.','small')
p('[3] <link href="https://www.ycombinator.com/companies/enact" color="#167865">Y Combinator: Enact</link> and <link href="https://enact.company/" color="#167865">Enact company website</link>: company activity and workflow.','small')
p('[4] Kress-Gazit et al. (2024), <link href="https://arxiv.org/abs/2409.09491" color="#167865">Robot Learning as an Empirical Science</link>.<br/>[5] Zhou et al. (2025), <link href="https://proceedings.mlr.press/v305/zhou25a.html" color="#167865">AutoEval</link>, CoRL / PMLR 305.<br/>[6] <link href="https://www.cbinsights.com/research/the-physical-ai-models-market-map/" color="#167865">CB Insights, physical AI models market map</link> (Jan 2026); <link href="https://counterpointresearch.com/insights/Global-Humanoid-Robot-Installations-Reach-16,000-Units-in-2025-as-Mass-Production-Picks-Pace" color="#167865">Counterpoint</link> (Jan 2026); <link href="https://www.trossenrobotics.com/post/robot-fleet-data-collection-physical-ai" color="#167865">Trossen Robotics</link> (Jul 2025); <link href="https://research.google/blog/robotic-deep-rl-at-scale-sorting-waste-and-recyclables-with-a-fleet-of-robots/" color="#167865">Google Research</link>; <link href="https://www.bloomberg.com/news/articles/2025-06-17/applied-intuition-hits-15-billion-valuation-for-ai-vehicle-tech" color="#167865">Bloomberg, Applied Intuition</link> (Jun 2025).','small')
p('<b>Jonathan Solomon, Founder / CEO</b>  |  <link href="mailto:hi@lightcompany.ai" color="#167865">hi@lightcompany.ai</link>  |  <link href="https://lightcompany.ai" color="#167865">lightcompany.ai</link>','small')
finish('white-paper.pdf','The Light Company | White Paper')

story=[];plain=[]
styles['title'].fontSize=31;styles['title'].leading=33;styles['title'].spaceAfter=10
styles['body'].fontSize=9.5;styles['body'].leading=12.8;styles['body'].spaceAfter=7
styles['h2'].fontSize=10.3;styles['h2'].leading=12.5;styles['h2'].spaceBefore=8
styles['lead'].fontSize=10.5;styles['lead'].leading=14;styles['lead'].spaceAfter=9
styles['small'].fontSize=7.5;styles['small'].leading=9.6;styles['small'].spaceAfter=5
p('THE LIGHT COMPANY  /  ONE-PAGE OVERVIEW','kicker')
p('Intelligence for the physical world.','title')
p('<b>AR without glasses. Projected light that guides real tasks, step by step.</b>','lead')
p('The Light Company is building intelligence that understands physical work, places instructions on real objects and surfaces, verifies progress, and guides a task to completion. Robotics is the first wedge. The larger platform brings useful AR into assembly, repair, training, and everyday work.')
impact()
p('<b>10 paid units | 3 paying customers | 20 stations running in labs</b><br/>Enact: 5 after one demo | New Theory: 4 | Trossen Robotics: 1.','small')
h('The problem: the physical input changes between tests')
p('A robot team needs to know whether its new policy improved. But someone must reset the objects before every trial. Even at a fixed station, a different position or orientation can change the result. That noise can distort model comparisons, debugging, and decisions about what data to collect.')
h('What Prism solves: a repeatable, verified starting condition')
p('Prism projects the target placement into the workspace. An operator resets the scene. Cameras verify the placement against the target. The light turns off before the robot runs. The result can then be linked to a known starting state. Teams can repeat the same test or vary conditions deliberately.')
p('Enact evaluations fell from 300-400 runs to 30 (10x). New Theory\'s variability fell from 40% to 3% in 30 days. Prism scores every run against the team\'s rubric and records the reason.','small')
h('Replace guesswork with engineering')
p('Enact (YC S26) bought five units after one demo for consistent initial conditions. The planned software would map failures and undersampled states: places where a large dataset may still lack useful examples. Teams could collect targeted data, retrain, and retest the same conditions. The goal is a measured learning loop, with broader AR applications in assembly, repair, and training.')
h('One station sale. Software on every run.')
p('A station sells for $1,500 at an 80% margin. Every evaluation after that runs through Prism at $1, every engineer works in the platform, and tooling and enterprise contracts sit on top. Labs re-test every time the model changes, so the software recurs. <b>250 labs at 20 stations each: $187M a year in software.</b> Applied Intuition, the same layer for self-driving cars, is valued at $15 billion.')
p('<b>Raising our seed</b> to ship 100 stations into labs, make the software self-serve, and publish the first public benchmark.','lead')
p('Sources: company records; <link href="https://www.ycombinator.com/companies/enact" color="#167865">YC / Enact</link>; <link href="https://www.cbinsights.com/research/the-physical-ai-models-market-map/" color="#167865">CB Insights</link>; <link href="https://www.bloomberg.com/news/articles/2025-06-17/applied-intuition-hits-15-billion-valuation-for-ai-vehicle-tech" color="#167865">Bloomberg</link>.','small')
p('<b>Jonathan Solomon</b>  |  <link href="mailto:hi@lightcompany.ai" color="#167865">hi@lightcompany.ai</link>  |  <link href="https://lightcompany.ai" color="#167865">lightcompany.ai</link>','small')
finish('overview.pdf','The Light Company | One-Page Overview')
