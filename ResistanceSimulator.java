import javax.swing.*;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.Map;

public class ResistanceSimulator extends JFrame {
    
    // Materiales y sus resistividades en Ω⋅m a 20°C
    private static final Map<String, Double> MATERIALS = new HashMap<>();
    static {
        MATERIALS.put("Plata", 1.59e-8);
        MATERIALS.put("Cobre", 1.68e-8);
        MATERIALS.put("Oro", 2.44e-8);
        MATERIALS.put("Aluminio", 2.82e-8);
        MATERIALS.put("Hierro", 9.71e-8);
        MATERIALS.put("Plomo", 2.20e-7);
        MATERIALS.put("Grafito", 3.5e-5);
    }
    
    // Componentes de la interfaz
    private JSlider lengthSlider;
    private JSlider areaSlider;
    private JComboBox<String> materialComboBox;
    private JLabel lengthValueLabel;
    private JLabel areaValueLabel;
    private JLabel resistanceLabel;
    private JLabel resistivityLabel;
    private JPanel visualPanel;
    
    // Valores actuales
    private double length = 1.0; // metros
    private double area = 1.0;   // mm²
    private String selectedMaterial = "Cobre";
    
    // Formateo de números
    private DecimalFormat df = new DecimalFormat("#.###");
    private DecimalFormat scientificFormat = new DecimalFormat("0.00E0");
    
    public ResistanceSimulator() {
        initializeComponents();
        setupLayout();
        setupEventListeners();
        updateCalculation();
        
        setTitle("Simulador de Resistencia Eléctrica");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(800, 600);
        setLocationRelativeTo(null);
        setResizable(false);
    }
    
    private void initializeComponents() {
        // Slider para longitud (0.1m a 10m)
        lengthSlider = new JSlider(1, 100, 10);
        lengthSlider.setMajorTickSpacing(20);
        lengthSlider.setMinorTickSpacing(5);
        lengthSlider.setPaintTicks(true);
        lengthSlider.setPaintLabels(true);
        
        // Slider para área (0.1mm² a 10mm²)
        areaSlider = new JSlider(1, 100, 10);
        areaSlider.setMajorTickSpacing(20);
        areaSlider.setMinorTickSpacing(5);
        areaSlider.setPaintTicks(true);
        areaSlider.setPaintLabels(true);
        
        // ComboBox para materiales
        materialComboBox = new JComboBox<>(MATERIALS.keySet().toArray(new String[0]));
        materialComboBox.setSelectedItem("Cobre");
        
        // Labels para mostrar valores
        lengthValueLabel = new JLabel("1.0 m");
        areaValueLabel = new JLabel("1.0 mm²");
        resistanceLabel = new JLabel();
        resistivityLabel = new JLabel();
        
        // Panel para visualización
        visualPanel = new VisualizationPanel();
        visualPanel.setPreferredSize(new Dimension(400, 200));
        visualPanel.setBorder(BorderFactory.createTitledBorder("Visualización del Conductor"));
    }
    
    private void setupLayout() {
        setLayout(new BorderLayout());
        
        // Panel principal
        JPanel mainPanel = new JPanel(new GridBagLayout());
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(10, 10, 10, 10);
        gbc.fill = GridBagConstraints.HORIZONTAL;
        
        // Título
        JLabel titleLabel = new JLabel("Simulador de Resistencia Eléctrica");
        titleLabel.setFont(new Font("Arial", Font.BOLD, 20));
        titleLabel.setHorizontalAlignment(SwingConstants.CENTER);
        gbc.gridx = 0; gbc.gridy = 0; gbc.gridwidth = 3;
        mainPanel.add(titleLabel, gbc);
        
        // Fórmula
        JLabel formulaLabel = new JLabel("R = ρ × L / A");
        formulaLabel.setFont(new Font("Arial", Font.ITALIC, 16));
        formulaLabel.setHorizontalAlignment(SwingConstants.CENTER);
        gbc.gridx = 0; gbc.gridy = 1; gbc.gridwidth = 3;
        mainPanel.add(formulaLabel, gbc);
        
        gbc.gridwidth = 1;
        
        // Material
        gbc.gridx = 0; gbc.gridy = 2;
        mainPanel.add(new JLabel("Material:"), gbc);
        gbc.gridx = 1; gbc.gridy = 2;
        mainPanel.add(materialComboBox, gbc);
        gbc.gridx = 2; gbc.gridy = 2;
        mainPanel.add(resistivityLabel, gbc);
        
        // Longitud
        gbc.gridx = 0; gbc.gridy = 3;
        mainPanel.add(new JLabel("Longitud (m):"), gbc);
        gbc.gridx = 1; gbc.gridy = 3;
        mainPanel.add(lengthSlider, gbc);
        gbc.gridx = 2; gbc.gridy = 3;
        mainPanel.add(lengthValueLabel, gbc);
        
        // Área
        gbc.gridx = 0; gbc.gridy = 4;
        mainPanel.add(new JLabel("Área (mm²):"), gbc);
        gbc.gridx = 1; gbc.gridy = 4;
        mainPanel.add(areaSlider, gbc);
        gbc.gridx = 2; gbc.gridy = 4;
        mainPanel.add(areaValueLabel, gbc);
        
        // Resultado
        gbc.gridx = 0; gbc.gridy = 5; gbc.gridwidth = 3;
        JPanel resultPanel = new JPanel();
        resultPanel.setBorder(BorderFactory.createTitledBorder("Resultado"));
        resultPanel.add(resistanceLabel);
        mainPanel.add(resultPanel, gbc);
        
        // Visualización
        gbc.gridx = 0; gbc.gridy = 6; gbc.gridwidth = 3;
        mainPanel.add(visualPanel, gbc);
        
        add(mainPanel, BorderLayout.CENTER);
        
        // Panel de información
        JPanel infoPanel = new JPanel();
        infoPanel.setBorder(BorderFactory.createTitledBorder("Información"));
        JTextArea infoText = new JTextArea(
            "Resistividad (ρ): Propiedad del material\n" +
            "Longitud (L): Longitud del conductor\n" +
            "Área (A): Área de la sección transversal\n" +
            "Resistencia (R): Oposición al flujo de corriente"
        );
        infoText.setEditable(false);
        infoText.setBackground(getBackground());
        infoPanel.add(infoText);
        add(infoPanel, BorderLayout.SOUTH);
    }
    
    private void setupEventListeners() {
        lengthSlider.addChangeListener(new ChangeListener() {
            @Override
            public void stateChanged(ChangeEvent e) {
                length = lengthSlider.getValue() / 10.0;
                lengthValueLabel.setText(df.format(length) + " m");
                updateCalculation();
                visualPanel.repaint();
            }
        });
        
        areaSlider.addChangeListener(new ChangeListener() {
            @Override
            public void stateChanged(ChangeEvent e) {
                area = areaSlider.getValue() / 10.0;
                areaValueLabel.setText(df.format(area) + " mm²");
                updateCalculation();
                visualPanel.repaint();
            }
        });
        
        materialComboBox.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                selectedMaterial = (String) materialComboBox.getSelectedItem();
                updateCalculation();
                visualPanel.repaint();
            }
        });
    }
    
    private void updateCalculation() {
        double resistivity = MATERIALS.get(selectedMaterial);
        double areaInM2 = area * 1e-6; // Convertir mm² a m²
        double resistance = resistivity * length / areaInM2;
        
        resistivityLabel.setText("ρ = " + scientificFormat.format(resistivity) + " Ω⋅m");
        
        String resistanceText;
        if (resistance < 1e-3) {
            resistanceText = scientificFormat.format(resistance) + " Ω";
        } else if (resistance < 1) {
            resistanceText = df.format(resistance * 1000) + " mΩ";
        } else if (resistance < 1000) {
            resistanceText = df.format(resistance) + " Ω";
        } else {
            resistanceText = df.format(resistance / 1000) + " kΩ";
        }
        
        resistanceLabel.setText("Resistencia: " + resistanceText);
        resistanceLabel.setFont(new Font("Arial", Font.BOLD, 16));
    }
    
    // Panel personalizado para visualización
    private class VisualizationPanel extends JPanel {
        @Override
        protected void paintComponent(Graphics g) {
            super.paintComponent(g);
            Graphics2D g2d = (Graphics2D) g;
            g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
            
            int panelWidth = getWidth();
            int panelHeight = getHeight();
            
            // Calcular dimensiones del conductor para la visualización
            int conductorLength = (int) (length * 30 + 50); // Escala visual
            int conductorHeight = (int) (area * 5 + 10);    // Escala visual
            
            // Limitar dimensiones para que quepan en el panel
            conductorLength = Math.min(conductorLength, panelWidth - 100);
            conductorHeight = Math.min(conductorHeight, panelHeight - 100);
            
            int x = (panelWidth - conductorLength) / 2;
            int y = (panelHeight - conductorHeight) / 2;
            
            // Color según el material
            Color materialColor = getMaterialColor(selectedMaterial);
            
            // Dibujar el conductor
            g2d.setColor(materialColor);
            g2d.fillRect(x, y, conductorLength, conductorHeight);
            g2d.setColor(Color.BLACK);
            g2d.drawRect(x, y, conductorLength, conductorHeight);
            
            // Dibujar dimensiones
            g2d.setColor(Color.BLUE);
            g2d.drawLine(x, y - 20, x + conductorLength, y - 20);
            g2d.drawString("L = " + df.format(length) + " m", x + conductorLength/2 - 30, y - 25);
            
            g2d.drawLine(x - 20, y, x - 20, y + conductorHeight);
            g2d.drawString("A = " + df.format(area) + " mm²", x - 80, y + conductorHeight/2);
            
            // Etiqueta del material
            g2d.setColor(Color.BLACK);
            g2d.setFont(new Font("Arial", Font.BOLD, 12));
            g2d.drawString(selectedMaterial, x + conductorLength/2 - 20, y + conductorHeight/2 + 5);
        }
        
        private Color getMaterialColor(String material) {
            switch (material) {
                case "Plata": return new Color(192, 192, 192);
                case "Cobre": return new Color(184, 115, 51);
                case "Oro": return new Color(255, 215, 0);
                case "Aluminio": return new Color(169, 169, 169);
                case "Hierro": return new Color(105, 105, 105);
                case "Plomo": return new Color(128, 128, 128);
                case "Grafito": return new Color(64, 64, 64);
                default: return Color.GRAY;
            }
        }
    }
    
    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                try {
                    UIManager.setLookAndFeel(UIManager.getSystemLookAndFeel());
                } catch (Exception e) {
                    e.printStackTrace();
                }
                
                new ResistanceSimulator().setVisible(true);
            }
        });
    }
}
