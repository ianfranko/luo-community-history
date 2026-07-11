"""
Generate a Luo Clan Family Tree SVG using networkx + matplotlib.
Output: public/clan-tree.svg

Run: python scripts/generate_tree.py
"""

import networkx as nx
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch
import os

# ─── Data ─────────────────────────────────────────────────────────────────────

CATEGORY_COLORS = {
    'legendary':          '#7c3aed',
    'clan-founder':       '#d97706',
    'traditional-leader': '#059669',
    'political-leader':   '#2563eb',
    'cultural-figure':    '#db2777',
    'community-hero':     '#dc2626',
}

CATEGORY_LABELS = {
    'legendary':          'Legendary Ancestor',
    'clan-founder':       'Clan Founder',
    'traditional-leader': 'Traditional Leader',
    'political-leader':   'Political Leader',
    'cultural-figure':    'Cultural Figure',
    'community-hero':     'Community Hero',
}

# (id, display_name, clan_short, category, birth_year, death_year)
NODES = [
    ('ramogi',      'Ramogi\nAjwang',           'Jo-Ramogi',       'legendary',          None, None),
    ('owiny',       'Owiny',                    'Jo-Owiny',        'clan-founder',        None, None),
    ('ojwang',      'Ojwang',                   'Jo-Ojwang',       'clan-founder',        None, None),
    ('nyabong',     'Nyabong',                  'Jo-Ramogi',       'legendary',           None, None),
    # Owiny's sub-clans
    ('alego',       'Alego',                    'Jo-Alego',        'clan-founder',        None, None),
    ('sakwa',       'Sakwa',                    'Jo-Sakwa',        'clan-founder',        None, None),
    ('gem',         'Gem',                      'Jo-Gem',          'clan-founder',        None, None),
    ('ugenya',      'Ugenya',                   'Jo-Ugenya',       'clan-founder',        None, None),
    ('asembo',      'Asembo',                   'Jo-Asembo',       'clan-founder',        None, None),
    ('uyoma',       'Uyoma',                    'Jo-Uyoma',        'clan-founder',        None, None),
    ('seme',        'Seme',                     'Jo-Seme',         'clan-founder',        None, None),
    # Ojwang's sub-clans
    ('karachuonyo', 'Karachuonyo',              'Jo-Karachuonyo',  'clan-founder',        None, None),
    ('kabondo',     'Kabondo',                  'Jo-Kabondo',      'clan-founder',        None, None),
    ('kasipul',     'Kasipul',                  'Jo-Kasipul',      'clan-founder',        None, None),
    ('kamagambo',   'Kamagambo',                'Jo-Kamagambo',    'clan-founder',        None, None),
    ('ndhiwa',      'Ndhiwa',                   'Jo-Ndhiwa',       'clan-founder',        None, None),
    ('gwasi',       'Gwasi',                    'Jo-Gwasi',        'clan-founder',        None, None),
    # Nyabong's sub-clans
    ('nyakach',     'Nyakach',                  'Jo-Nyakach',      'clan-founder',        None, None),
    ('kano',        'Kano',                     'Jo-Kano',         'clan-founder',        None, None),
    ('kolwa',       'Kolwa',                    'Jo-Kolwa',        'clan-founder',        None, None),
    ('kisumu',      'Jo-Kisumu',                'Jo-Kisumu',       'clan-founder',        None, None),
    # Jo-Agoro sub-lineage of Nyakach (source: oral history video + Facebook post, 2026)
    ('agoro-patriarch', 'Agoro\n(Patriarch)',   'Jo-Agoro',        'legendary',           None, None),
    ('wuod-oduor',  'Wuod\nOduor',             'Jo-Agoro',        'traditional-leader',  None, 1900),
    ('joagoro',     'Jo-Agoro',                'Jo-Agoro',         'clan-founder',        None, None),
    ('nenwudu',     'Nenwudu',                  'Jo-Agoro',        'traditional-leader',  None, None),
    ('kawiti',      'Kawiti',                   'Jo-Agoro',        'traditional-leader',  None, None),
    ('nombai',      'Nombai',                   'Jo-Agoro',        'traditional-leader',  1730, None),
    ('ukelu',       'Ukelu',                    'Jo-Agoro',        'traditional-leader',  None, None),
    ('oracha-gula', 'Oracha\nGula',             'Jo-Agoro',        'traditional-leader',  None, None),
    ('miloma',      'Miloma',                   'Jo-Agoro',        'traditional-leader',  None, None),
    ('okondo',      'O Kondo',                  'Jo-Agoro',        'traditional-leader',  None, None),
    ('migo',        'Migo\n(Seirounda)',         'Jo-Agoro',        'community-hero',      None, None),
    ('yamo',        'Yamo',                     'Jo-Agoro',        'community-hero',      None, None),
    ('wurkere',     'Chief\nWurkere',           'Jo-Nyakach',      'traditional-leader',  None, None),

    # Notable figures
    ('jaramogi',    'Jaramogi\nOginga Odinga',  'Jo-Alego',        'political-leader',    1911, 1994),
    ('raila',       'Raila\nOdinga',            'Jo-Alego',        'political-leader',    1945, None),
    ('grace-ogot',  'Grace\nOgot',              'Jo-Ugenya',       'cultural-figure',     1930, 2015),
    ('tom-mboya',   'Tom\nMboya',               'Jo-Kabondo',      'political-leader',    1930, 1969),
    ('ayieko',      'Chief\nAyieko',            'Jo-Gem',          'traditional-leader',  1870, 1945),
    ('odera',       "Odera\nAkang'o",           'Jo-Gem',          'traditional-leader',  1869, 1918),
]

EDGES = [
    ('ramogi', 'owiny'), ('ramogi', 'ojwang'), ('ramogi', 'nyabong'),
    ('owiny', 'alego'), ('owiny', 'sakwa'), ('owiny', 'gem'),
    ('owiny', 'ugenya'), ('owiny', 'asembo'), ('owiny', 'uyoma'), ('owiny', 'seme'),
    ('ojwang', 'karachuonyo'), ('ojwang', 'kabondo'), ('ojwang', 'kasipul'),
    ('ojwang', 'kamagambo'), ('ojwang', 'ndhiwa'), ('ojwang', 'gwasi'),
    ('nyabong', 'nyakach'), ('nyabong', 'kano'), ('nyabong', 'kolwa'), ('nyabong', 'kisumu'),
    # Jo-Agoro lineage under Nyakach
    ('nyakach', 'joagoro'), ('nyakach', 'wurkere'),
    ('agoro-patriarch', 'wuod-oduor'),
    ('joagoro', 'agoro-patriarch'),
    ('joagoro', 'nenwudu'),
    ('nenwudu', 'kawiti'),
    ('kawiti', 'nombai'),
    ('nombai', 'ukelu'),
    ('ukelu', 'oracha-gula'),
    ('oracha-gula', 'miloma'),
    ('miloma', 'okondo'),
    ('okondo', 'migo'), ('okondo', 'yamo'),
    ('alego',   'jaramogi'), ('jaramogi', 'raila'),
    ('ugenya',  'grace-ogot'),
    ('kabondo', 'tom-mboya'),
    ('gem',     'ayieko'), ('gem', 'odera'),
]

# ─── Build graph ──────────────────────────────────────────────────────────────

G = nx.DiGraph()
node_data = {n[0]: n for n in NODES}
for nid, *_ in NODES:
    G.add_node(nid)
for src, dst in EDGES:
    G.add_edge(src, dst)

# ─── Reingold-Tilford style layout ────────────────────────────────────────────

def hierarchy_pos(G, root, total_width=1.0, level_gap=1.0):
    """
    Assigns (x, y) to every node with proper left-to-right ordering
    and no overlaps within each level.
    """
    # BFS to get each node's depth
    depths = nx.single_source_shortest_path_length(G, root)
    max_depth = max(depths.values())

    # Group nodes by depth in BFS order
    levels = {}
    for node, d in depths.items():
        levels.setdefault(d, []).append(node)

    # Assign x positions: spread evenly within total_width at each level
    pos = {}
    for depth, nodes in levels.items():
        n = len(nodes)
        for i, node in enumerate(nodes):
            x = (i + 0.5) / n * total_width
            y = -depth * level_gap
            pos[node] = (x, y)

    return pos

pos = hierarchy_pos(G, 'ramogi', total_width=20.0, level_gap=3.2)

# ─── Canvas setup ─────────────────────────────────────────────────────────────

fig, ax = plt.subplots(figsize=(44, 26))
ax.set_facecolor('#fdf8f0')
fig.patch.set_facecolor('#fdf8f0')
ax.axis('off')

# ─── Node dimensions by tier ──────────────────────────────────────────────────

def node_dims(nid):
    _, _, _, category, _, _ = node_data[nid]
    if nid == 'ramogi':
        return 1.05, 0.68, 13.5, 10.5, 3.0
    if nid in ('owiny', 'ojwang', 'nyabong'):
        return 0.88, 0.60, 12.5, 9.5, 2.5
    if category == 'clan-founder':
        return 0.80, 0.54, 11.0, 8.5, 2.0
    return 0.80, 0.60, 10.5, 8.0, 2.0   # notables
    # returns: half_w, half_h, name_fs, clan_fs, lw

# ─── Draw edges ───────────────────────────────────────────────────────────────

for src, dst in G.edges():
    x0, y0 = pos[src]
    x1, y1 = pos[dst]
    _, h0, *_ = node_dims(src)
    _, h1, *_ = node_dims(dst)

    # Exit from bottom of parent, enter top of child
    y_start = y0 - h0
    y_end   = y1 + h1
    y_mid   = (y_start + y_end) / 2

    # Elbow connector: vertical then horizontal then vertical
    ax.plot([x0, x0], [y_start, y_mid], color='#d97706', lw=1.8, zorder=1, solid_capstyle='round')
    ax.plot([x0, x1], [y_mid,   y_mid], color='#d97706', lw=1.8, zorder=1, solid_capstyle='round')
    ax.plot([x1, x1], [y_mid,   y_end], color='#d97706', lw=1.8, zorder=1, solid_capstyle='round')

    # Arrowhead
    ax.annotate('', xy=(x1, y_end), xytext=(x1, y_end + 0.12),
                 arrowprops=dict(arrowstyle='-|>', color='#d97706', lw=1.4, mutation_scale=12))

# ─── Draw nodes ───────────────────────────────────────────────────────────────

for nid, (x, y) in pos.items():
    _, display, clan, category, birth, death = node_data[nid]
    color = CATEGORY_COLORS[category]
    hw, hh, fs_name, fs_clan, lw = node_dims(nid)

    is_notable = category not in ('legendary', 'clan-founder')

    # Light tinted background
    import matplotlib.colors as mcolors
    r, g, b = mcolors.to_rgb(color)
    face_color = (r * 0.08 + 0.92, g * 0.08 + 0.92, b * 0.08 + 0.92)

    box = FancyBboxPatch(
        (x - hw, y - hh), 2 * hw, 2 * hh,
        boxstyle='round,pad=0.02',
        linewidth=lw,
        edgecolor=color,
        facecolor=face_color,
        zorder=2,
    )
    ax.add_patch(box)

    # Category label (small caps above name)
    cat_label = CATEGORY_LABELS[category].upper()
    ax.text(x, y + hh * 0.55, cat_label,
            fontsize=fs_clan * 0.72, fontweight='bold', color=color,
            ha='center', va='center', zorder=3,
            fontfamily='DejaVu Sans', alpha=0.85)

    # Name
    ax.text(x, y + 0.02, display,
            fontsize=fs_name, fontweight='bold', color='#111827',
            ha='center', va='center', zorder=3,
            multialignment='center', fontfamily='DejaVu Sans',
            linespacing=1.35)

    # Clan
    ax.text(x, y - hh * 0.50, clan,
            fontsize=fs_clan, color=color, fontweight='semibold',
            ha='center', va='center', zorder=3,
            fontfamily='DejaVu Sans')

    # Years (notables only)
    if birth:
        year_str = f"{birth} – {death if death else 'present'}"
        ax.text(x, y - hh * 0.82, year_str,
                fontsize=fs_clan * 0.75, color='#9ca3af',
                ha='center', va='center', zorder=3,
                fontfamily='DejaVu Sans')

# ─── Title ────────────────────────────────────────────────────────────────────

y_top = max(p[1] for p in pos.values())
ax.text(10.0, y_top + 1.5,
        'Luo Clan Family Tree',
        fontsize=22, fontweight='bold', color='#1a1a2e',
        ha='center', va='center', fontfamily='DejaVu Sans')
ax.text(10.0, y_top + 0.9,
        'From Ramogi Ajwang — legendary founding ancestor — through the sub-clan founders to notable historical figures',
        fontsize=10, color='#6b7280',
        ha='center', va='center', fontfamily='DejaVu Sans')

# ─── Legend ───────────────────────────────────────────────────────────────────

legend_handles = [
    mpatches.Patch(facecolor=c, edgecolor=c, label=CATEGORY_LABELS[k], linewidth=1.5)
    for k, c in CATEGORY_COLORS.items()
]
ax.legend(
    handles=legend_handles,
    loc='lower right',
    fontsize=9.5,
    framealpha=0.95,
    edgecolor='#e5e7eb',
    facecolor='white',
    title='Category',
    title_fontsize=10.5,
    borderpad=0.9,
    labelspacing=0.55,
)

# ─── Axis limits ──────────────────────────────────────────────────────────────

all_x = [p[0] for p in pos.values()]
all_y = [p[1] for p in pos.values()]
ax.set_xlim(min(all_x) - 1.4, max(all_x) + 1.4)
ax.set_ylim(min(all_y) - 1.2, max(all_y) + 2.4)

plt.tight_layout(pad=0.5)

# ─── Save ─────────────────────────────────────────────────────────────────────

out_path = os.path.normpath(os.path.join(os.path.dirname(__file__), '..', 'public', 'clan-tree.svg'))
plt.savefig(out_path, format='svg', bbox_inches='tight', dpi=150)
print(f'Saved: {out_path}')
